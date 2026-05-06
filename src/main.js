import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import sort from '@alpinejs/sort'

Alpine.plugin(persist)
Alpine.plugin(sort)

// https://docs.google.com/spreadsheets/d/1wK6ykzyu6zoW7SmsiJHSaTfwt0E6cNL30LQaA6P8Zmo/edit?pli=1&gid=1746168777#gid=1746168777
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1wK6ykzyu6zoW7SmsiJHSaTfwt0E6cNL30LQaA6P8Zmo/gviz/tq?tqx=out:json&tq&gid=1746168777"

Alpine.data('kanbanApp', () => ({
    csvData: [],
    data: Alpine.$persist([]).as('kanbanData'),
    notes: Alpine.$persist({}).as('kanbanNotes'),
    selectedItem: null,
    isFetching: false,

    init() {
        this.refreshSheetData()
    },

    async refreshSheetData() {
        this.isFetching = true
        try {
            const response = await fetch(SHEET_URL)
            const text = await response.text()
            const json = JSON.parse(text.substring(47, text.length - 2))
            this.csvData = this.parseSheetData(json.table.rows.map(row => row.c.map(cell => cell ? cell.v : '')))
            this.checkInternalData()
        } catch (error) {
            console.error('Error fetching sheet data:', error)
        }
        this.isFetching = false
    },

    parseSheetData(rows) {
        rows[0][9] = "Date Updated"
        rows[0][7] = "Edits"
        const keys = rows[0]
        return rows.slice(1).map(row => {
            const obj = {}
            keys.forEach((key, index) => {
                obj[key] = row[index]
            })
            return obj
        }).filter(item => item['Date Updated'] === "") // Only include items that haven't been updated yet
    },

    checkInternalData() {
        // If there is any data in our internal state that isn't in the sheet, remove it
        const sheetEdits = this.csvData.map(item => item['Edits'])
        this.data = this.data.filter(item => sheetEdits.includes(item['Edits']))
        // If there are any items in the sheet that aren't in our internal state, add them
        const internalEdits = this.data.map(item => item['Edits'])
        const newItems = this.csvData.filter(item => !internalEdits.includes(item['Edits'])).map(item => ({ ...item, "Status": "Not Started" }))
        this.data = [...this.data, ...newItems]
    },

    /* Columns */
    get notStartedColumn() {
        return this.data.filter(item => item['Status'] === 'Not Started')
    },
    get inProgressColumn() {
        return this.data.filter(item => item['Status'] === 'In Progress')
    },
    get waitingColumn() {
        return this.data.filter(item => item['Status'] === 'Waiting')
    },

    /* Drag and Drop */
    moveItemToStatus(itemKey, position, newStatus) {
        const draggedItem = this.data.find(item => item['Edits'] === itemKey)

        if (!draggedItem) return

        const dataWithoutItem = this.data.filter(item => item['Edits'] !== itemKey)
        const matchingIndices = dataWithoutItem
            .map((item, index) => (item['Status'] === newStatus ? index : -1))
            .filter(index => index !== -1)

        draggedItem['Status'] = newStatus

        let insertIndex = dataWithoutItem.length

        if (matchingIndices.length > 0) {
            if (position <= 0) {
                insertIndex = matchingIndices[0]
            } else if (position >= matchingIndices.length) {
                insertIndex = matchingIndices[matchingIndices.length - 1] + 1
            } else {
                insertIndex = matchingIndices[position]
            }
        }

        dataWithoutItem.splice(insertIndex, 0, draggedItem)
        this.data = dataWithoutItem
    },

    sortNotStarted(itemKey, position) {
        this.moveItemToStatus(itemKey, position, 'Not Started')
    },

    sortInProgress(itemKey, position) {
        this.moveItemToStatus(itemKey, position, 'In Progress')
    },

    sortWaiting(itemKey, position) {
        this.moveItemToStatus(itemKey, position, 'Waiting')
    },

    deleteItem(itemKey) {
        const item = this.data.find(entry => entry['Edits'] === itemKey)

        if (!item) return

        this.data = this.data.filter(entry => entry['Edits'] !== itemKey)
        delete this.notes[itemKey]
    },

    /* Modal */
    openModal(item) {
        this.selectedItem = item
    },

    closeModal() {
        this.selectedItem = null
    },

    saveNote(item) {
        if (item) {
            this.notes[item['Edits']] = this.notes[item['Edits']] || ''
        }
    },

    /* Utilities */
    truncateUrl(url) {
        if (!url) return ''
        if (url.length > 50) {
            return url.substring(0, 47) + '...'
        }
        return url
    },
    formatDate(dateString) {
        // Parses a string like "Date(2026,4,4)" as a date and formats it as "MM/DD/YYYY"
        if (!dateString) return ''
        const match = dateString.match(/Date\((\d+),(\d+),(\d+)\)/)
        if (match) {
            const year = parseInt(match[1])
            const month = parseInt(match[2]) + 1 // Months are 0-indexed
            const day = parseInt(match[3])
            return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`
        }
        return dateString
    }
}))

window.Alpine = Alpine
Alpine.start()

