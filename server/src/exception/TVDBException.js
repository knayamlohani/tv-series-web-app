class TVDBException extends Error {
    constructor(message) {
        super();
        this.message = message
    }
}

module.exports = TVDBException