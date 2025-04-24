function locomotivejs(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function gsapanime(){
  var tl=gsap.timeline()


tl.from(".nav-bar",{
    y:-1000,
    duration:1.5,
    opacity:0
})
tl.from(".content h1 ,p",{
    y:310,
    duration:1,
    
})
tl.from("#aibtn",{
    y:50,
    opacity:0
})
tl.from(".page3  .p3box h1",{
  y:-310,
  opacity:0,
  duration:1,
  scrollTrigger:{
    trigger:".page3",
    scroller:"#main",
    // markers:true,
    start:"top 60%",
    end:"top 30%",
    }  
})
tl.from(".page4  .p4box h1",{
  y:-310,
  opacity:0,
  duration:5,
  scrollTrigger:{
    trigger:".page4",
    scroller:"#main",
    // markers:true,
    start:"top 60%",
    end:"top 30%",
   

  }
  
})
tl.from(".page5  .p5box h1",{
  y:-310,
  opacity:0,
  duration:1.5,
  scrollTrigger:{
    trigger:".page5",
    scroller:"#main",
    // markers:true,
    start:"top 60%",
    end:"top 30%",
   

  }
  
})

tl.from(".page6  .p6box h1",{
  y:-310,
  opacity:0,
  duration:1.5,
  scrollTrigger:{
    trigger:".page6",
    scroller:"#main",
    // markers:true,
    start:"top 60%",
    end:"top 30%",
   

  }
  
})


}
locomotivejs()
gsapanime()




