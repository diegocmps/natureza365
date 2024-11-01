class PagedResult {
    constructor(page, pageSize, data, total) {
        this.page = page;
        this.pageSize = pageSize;
        this.dados = data;
        this.total = total;
    }
}

module.exports = PagedResult