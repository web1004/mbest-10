$(document).ready(function(){

  $.scrollify({
    section : "section",
    easing: "easeOutExpo",
    scrollSpeed: 100,
    interstitialSection: "header",
  });

  $(window).scroll(function(){

    let pos = $(window).scrollTop();
    
    if(pos>50){
      $("nav").addClass('active');
    }else{
      $("nav").removeClass('active');
    }
    
  
  $(window).scroll(function(){

    let ppos = $(window)

  });  

  }); 
            
  $('.counter').counterUp({
    delay: 10, 
    time: 1000  
   });

   const cursor = document.querySelector('#cursor');
   const cursorCircle = cursor.querySelector('.cursor__circle');
   
   const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
   const pos = { x: 0, y: 0 }; // cursor's coordinates
   const speed = 0.1; // between 0 and 1
   
   const updateCoordinates = e => {
     mouse.x = e.clientX;
     mouse.y = e.clientY;
   }
   
   window.addEventListener('mousemove', updateCoordinates);
   
   
   function getAngle(diffX, diffY) {
     return Math.atan2(diffY, diffX) * 180 / Math.PI;
   }
   
   function getSqueeze(diffX, diffY) {
     const distance = Math.sqrt(
       Math.pow(diffX, 2) + Math.pow(diffY, 2)
     );
     const maxSqueeze = 0.15;
     const accelerator = 1500;
     return Math.min(distance / accelerator, maxSqueeze);
   }
   
   
   const updateCursor = () => {
     const diffX = Math.round(mouse.x - pos.x);
     const diffY = Math.round(mouse.y - pos.y);
     
     pos.x += diffX * speed;
     pos.y += diffY * speed;
     
     const angle = getAngle(diffX, diffY);
     const squeeze = getSqueeze(diffX, diffY);
     
     const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
     const rotate = 'rotate(' + angle +'deg)';
     const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';
   
     cursor.style.transform = translate;
     cursorCircle.style.transform = rotate + scale;
   };
   
   function loop() {
     updateCursor();
     requestAnimationFrame(loop);
   }
   
   requestAnimationFrame(loop);
   
   
   
   const cursorModifiers = document.querySelectorAll('[cursor-class]');
   
   cursorModifiers.forEach(curosrModifier => {
     curosrModifier.addEventListener('mouseenter', function() {
       const className = this.getAttribute('cursor-class');
       cursor.classList.add(className);
     });
     
     curosrModifier.addEventListener('mouseleave', function() {
       const className = this.getAttribute('cursor-class');
       cursor.classList.remove(className);
     });
   });
   
   $(".btn>li").click(function(){

    $(this).addClass("active");
    $(this).siblings().removeClass("active");

    let result = $(this).attr("data-alt");
    $(".tabContents div").removeClass("active");
    $("#" + result).addClass("active"); 
  
  });

     $(".btns>li").click(function(){

    $(this).addClass("active");
    $(this).siblings().removeClass("active");

    let result = $(this).attr("data-alt");
    $(".tabContentss div").removeClass("active");
    $("#" + result).addClass("active"); 
  
  });

  const clip = (v, min, max = Infinity) => {
    if (v < min) return min;
    else if (v > max) return max;
    else return v;
  };
  
  // generated random value from given range
  const randRange = (min, max) => Math.random() * max + min;
  
  // create bubble on x and y position inside target with given hue theme
  function bubble(x, y, rect, hue, target) {
    // variables
    const size = randRange(20, rect.width / 5);
    const circleHue = hue + randRange(-20, 20);
    const animDuration = randRange(clip(size ** 2/1000, 1), 6) 
    const zIndex = Math.random() < 0.1 ? 2 : -1;
    // apply to DOM
    const circle = document.createElement("span");
    circle.className = "lit";
    circle.style.left = x + "px";
    circle.style.top = y + "px";
    circle.style.width = size + "px";
    circle.style.height = size + "px";
    circle.style.background = `hsl(${circleHue}deg, 100%, 60%)`;
    circle.style.zIndex = zIndex
    circle.style.animationDuration = animDuration + "s";
    target.appendChild(circle);
  }
  
  document.querySelectorAll("[data-lit-hue]").forEach((target) => {
    const rect = target.getBoundingClientRect();
    const hue = Number(target.getAttribute("data-lit-hue"));
    const count = Number(target.getAttribute("data-lit-count") || 50);
  
    for (let i = 0; i < count; i++) {
      const x = randRange(0, rect.width);
      const y = randRange(0, rect.height);
      bubble(x, y, rect, hue, target);
    }
  }); 

  $(".sevitlink").click(function(){
    $(".sevitpop").next().show();
    $("html").css({overflowY:"hidden"});
  });

  $(".close").click(function(){
    $(".sevitpop").hide();
    $("html").css({"overflow-y":"scroll"});
  });


  //리스트 이미지 클릭 시 ...
 $(".item_list>li").click(function(){

  g_pop=$(this).index();
  $(".g_page span:nth-child(1)").text(g_pop+1); //오른쪽 상단 페이지 넘버 
  $("html").css({overflowY:"hidden"}); //기존 html 스크롤 숨기기
  $.scrollify.disable();
  $(".pop>li").eq(g_pop).show(); //g_pop index에 해당하는 팝업보이기 
  $("#popup").stop().fadeIn(); //검정배경 

 });

 

 //다음보기 
 $(".right_btn").click(function(){

  $("#popup").scrollTop(0);

  if(g_pop<6){
    $(".pop>li").eq(g_pop).stop().fadeOut(); //기존 거 사라짐
    g_pop++;
    $(".g_page span:nth-child(1)").text(g_pop+1);
    $(".pop>li").eq(g_pop).stop().fadeIn();
  }

 });


 //이전보기
 $(".left_btn").click(function(){

  if(g_pop>0){
    $(".pop>li").eq(g_pop).stop().fadeOut(); //기존 거 사라짐
    g_pop--;
    $(".g_page span:nth-child(1)").text(g_pop+1);
    $(".pop>li").eq(g_pop).stop().fadeIn();
  }

 });


 //닫기
 $(".btn_close").click(function(){

  $("html").css({overFlowY:"scroll"});
  $("#popup").stop().fadeOut();
  $(".pop>li").stop().hide();
  $.scrollify.enable();

 });
 


});
  
