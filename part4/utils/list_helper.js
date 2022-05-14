const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return Object.values(blogs).reduce((p, {likes}) => p + likes, 0)
}

const favoriteBlog = (blogs) => {
    const max = blogs.reduce((p, blog) => p > blog.likes ? p : blog.likes)
    const favBlog = blogs.find(({likes}) => likes === max)
    return { author: favBlog.author, likes: favBlog.likes, title: favBlog.title}
}

const mostBlogs = (blogs) => {
    const authorsGroup = blogs.reduce((p, blog) => {
        p[blog.author] = (p[blog.author] || 0) + 1
        return p
    }, {})
    const max = Math.max(...Object.values(authorsGroup))
    const biggestWriter = Object.keys(authorsGroup).filter(author => authorsGroup[author] === max)[0]
    return { author: biggestWriter, blogs: max }
}

const mostLikes = (blogs) => {
    const authorsGroup = blogs.reduce((p, blog) => {
        p[blog.author] = (p[blog.author] || 0) + blog.likes
        return p
    }, {})
    const max = Math.max(...Object.values(authorsGroup))
    const mostLikedWriter = Object.keys(authorsGroup).filter(author => authorsGroup[author] === max)[0]
    return { author: mostLikedWriter, likes: max }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}