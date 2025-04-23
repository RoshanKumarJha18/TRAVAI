var tl=gsap.timeline()


tl.from(".nav-bar",{
    y:-1000,
    duration:1.5,
    opacity:0
})
tl.from(".content h1 ,p",{
    y:200,
    duration:1,
    
})
tl.from("#aibtn",{
    y:50,
    opacity:0
})