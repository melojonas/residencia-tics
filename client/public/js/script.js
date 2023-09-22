function toggleMenu() {
    var sidebar = document.querySelector('.sidebar');
    var content = document.querySelector('.content');
    sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
}