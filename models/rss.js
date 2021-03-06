var pool = require(__dirname + '/dbConnectionPool.js')

function Rss() {}

Rss.prototype.read = function(id) {
    return pool.query('SELECT * FROM rss WHERE id = $1', [id])
}

Rss.prototype.readAll = function(limit = 3, offset = 0) {
    return pool.query('SELECT * FROM rss ORDER BY id LIMIT ' + limit + ' OFFSET ' + offset)
}

Rss.prototype.readByCategoryId = function(categoryId, limit = 3, offset = 0) {
	return pool.query('SELECT * FROM rss WHERE categoryId = $1 ORDER BY id LIMIT ' + limit + ' OFFSET ' + offset, [parseInt(categoryId, 10)])
}

Rss.prototype.create = function(entity) {
	return pool.query('INSERT INTO rss (CategoryId, RssName, RssUrl, Thumbnail, CreateTimestamp) '
		+ ' VALUES ($1, $2, $3, $4, now())', 
		[entity.categoryId, entity.rssName, entity.rssUrl, entity.thumbnail]);
}

Rss.prototype.refreshUpdateTime = function(rssId) {
	return pool.query('UPDATE rss SET lastUpdateTimestamp = now() WHERE rssId = $1', [rssId]);
}

exports = module.exports = new Rss()
