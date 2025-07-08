/**
     * @param {Object} params
     * @param {string|number} params.id
     * @param {string} params.title
     * @param {string} params.description
     * @param {string} [params.status='pending']
     */
export default class Task {
    constructor({ id, title, description, status }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status || 'pending';
    }
}
