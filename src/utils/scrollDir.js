export default async function checkScroll(scrollY) {
    let lastY;
    let scrollDir;
    console.log(scrollY)
	if (scrollY) { 
        scrollDir = scrollY > lastY ? "down" : "up"
        lastY = scrollY;
        return scrollDir;
    }
}