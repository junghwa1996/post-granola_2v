var galleryList = new Swiper('.gallery-list-container', {
	init: false,
	loop: false,
	preloadImages: false,
	lazy: true,
	pagination: {
		el: '.swiper-pagination',
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

galleryList.on('init', function() {
	if (this.slides.length > 5) {
		$('.swiper-pagination').hide();
		$('.swiper-pagination2').show();
	}
});

galleryList.init();

galleryList.on('slideChange', function() {
	if (this.slides.length > 5) {
		$('.swiper-pagination2 .swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active');
		if (this.activeIndex === 0) {
			$('.swiper-pagination2 .swiper-pagination-bullet:nth-child(1)').addClass('swiper-pagination-bullet-active');
		}
		if (this.activeIndex === 1) {
			$('.swiper-pagination2 .swiper-pagination-bullet:nth-child(2)').addClass('swiper-pagination-bullet-active');
		}
		if (this.activeIndex > 1 && this.activeIndex < this.slides.length - 2) {
			$('.swiper-pagination2 .swiper-pagination-bullet:nth-child(3)').addClass('swiper-pagination-bullet-active');
		}
		if (this.activeIndex === this.slides.length - 2) {
			$('.swiper-pagination2 .swiper-pagination-bullet:nth-child(4)').addClass('swiper-pagination-bullet-active');
		}
		if (this.activeIndex === this.slides.length - 1) {
			$('.swiper-pagination2 .swiper-pagination-bullet:nth-child(5)').addClass('swiper-pagination-bullet-active');
		}
	}
});

// youtube API 불러옴
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 플레이어변수 설정
var youTubePlayer1;

function onYouTubeIframeAPIReady() {
	youTubePlayer1 = new YT.Player('youTubePlayer1', {
		width: '1280',
		height: '720',
		videoId: 'UujZhFCvbq4',
		playerVars: {rel: 0},//추천영상 안보여주게 설정
		events: {
			'onReady': onPlayerReady, //로딩할때 이벤트 실행
			'onStateChange': onPlayerStateChange //플레이어 상태 변화시 이벤트실행
		}
	});//youTubePlayer1셋팅
}

function onPlayerReady(event) {
	// event.target.playVideo();//자동재생
	//로딩할때 실행될 동작을 작성한다.
}

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {
	//플레이어가 재생중일때 작성한 동작이 실행된다.
	}
}

function fixedNav() {
    if ($(document).scrollTop() > $('header h1').height()) {
        $('header').addClass('fixed');
    } else {
        $('header').removeClass('fixed');
	}
	if ($(document).scrollTop() > $('#event1').offset().top - $('nav').height() - 1 && $(document).scrollTop() < $('#event2').offset().top - $('nav').height() - 1) {
		$('.nav-event1').addClass('active');
		$('.nav-event2').removeClass('active');
		$('.nav-event3').removeClass('active');
	} else if ($(document).scrollTop() > $('#event2').offset().top - $('nav').height() - 1 && $(document).scrollTop() < $('#event3').offset().top - $('nav').height() - 1) {
		$('.nav-event1').removeClass('active');
		$('.nav-event2').addClass('active');
		$('.nav-event3').removeClass('active');
	} else if ($(document).scrollTop() > $('#event3').offset().top - $('nav').height() - 1 && $(document).scrollTop() < $('.notice').offset().top - $('nav').height()) {
		$('.nav-event1').removeClass('active');
		$('.nav-event2').removeClass('active');
		$('.nav-event3').addClass('active');
	} else {
		$('.nav-event1').removeClass('active');
		$('.nav-event2').removeClass('active');
		$('.nav-event3').removeClass('active');
	}
}

const targetElement = document.querySelector('#modal');

function modalOpen(modal) {
    $('body').addClass('modal-active');
    $('#modal').addClass('active');
    $(modal).removeClass('hidden');
	$(modal + '-page1').removeClass('hidden');
	bodyScrollLock.disableBodyScroll(targetElement);
}

function modalNext(modal, current, next) {
	$(modal + '-' + current).addClass('hidden');
	if (next === 'end') {
		modalClose();
	} else {
		$(modal + '-' + next).removeClass('hidden');
	}
}

function modalCheck(modal, current, next) {
    var modalForms = [];
    modalForms.push($(modal + '-' + current + ' .form-name input'));
    modalForms.push($(modal + '-' + current + ' .form-tel input'));
    modalForms.push($(modal + '-' + current + ' .form-address input:first-of-type'));
	modalForms.push($(modal + '-' + current + ' .form-agree input'));
    var regexPhone = /^(010)[0-9]{4}[0-9]{4}$/;
    if (modalForms[0].val() === '') {
        alert('정보를 입력해주세요!');
        modalForms[0].focus();
        modalForms[0].scroll();
        return false;
    } else if (modalForms[1].val() === '') {
        alert('정보를 입력해주세요!');
        modalForms[1].focus();
        modalForms[1].scroll();
        return false;
    } else if (modalForms[2].val() === '') {
        alert('정보를 입력해주세요!');
        $(modal + '-' + current + ' .form-address-find').focus();
        $(modal + '-' + current + ' .form-address-find').scroll();
        return false;
    } else if (!regexPhone.test(modalForms[1].val())) {
        alert('연락처를 확인해주세요.');
        modalForms[1].focus();
        modalForms[1].scroll();
        return false;
    } else if (modalForms[3].prop('checked') === false) {
        alert('개인 정보 취급/이용 약관에 동의해주세요.');
        modalForms[3].focus();
        modalForms[3].scroll();
        return false;
    } else {
        alert('참여가 완료 되었습니다.');
        modalNext(modal, current, next);
    }
}

function modalClose() {
    $('body').removeClass('modal-active');
    $('#modal').removeClass('active');
    $('.modal-container').addClass('hidden');
	$('.modal-page').addClass('hidden');
	$('#modal input[type="text"]').val('');
	$('#modal input[type="tel"]').val('');
	$('#modal textarea').val('');
	$('#modal input[type="checkbox"]').prop('checked', false);
	bodyScrollLock.enableBodyScroll(targetElement);
}

function hashtagCopy() {
    var dummy = document.createElement("textarea");
    document.querySelector('.hash-dummy').appendChild(dummy);
    dummy.value = '#포스트그래놀라 #포스트현미그래놀라 #그래놀라홈브런치 #홈브런치맛집 #포스트그래놀라인증';
    dummy.select();
    document.execCommand("copy");
	document.querySelector('.hash-dummy').removeChild(dummy);
	alert('해시태그 복사가 완료되었습니다.');
}

$('header nav').on('click', 'a[href^="#"]', function(event) {
	event.preventDefault();
	$('html, body').animate({
		scrollTop: $($.attr(this, 'href')).offset().top - $('nav').height() + 1
	}, 500);
});

$(document).ready(function() {
    $(".movie-thumb").on("click", function() {
        $(this).hide();
        youTubePlayer1.playVideo();//재생
    });
});

$(window).scroll(function() {
	fixedNav();
});

$('.button-event1').click(function() {
	modalOpen('.modal-event1');
});

$('.modal-event1-page1 .modal-submit').click(function() {
	modalNext('.modal-event1', 'page1', 'page2');
});

$('.modal-event1-page2 .modal-submit').click(function() {
	modalCheck('.modal-event1', 'page2', 'end');
});

// $('input[name="eventSelect"]').change(function() {
// 	$('.event2-select li').removeClass('active');
// 	if ($(this).is(':checked') === true) {
// 		$(this).parent('li').addClass('active');
// 	}
// })

$('.button-event2').click(function() {
		modalOpen('.modal-event2');
});

$('.modal-event2-page1 .event2-select ul li:not(:nth-child(1))').click(function() {
	modalNext('.modal-event2', 'page1', 'page2');
});

$('.modal-event2-page2 .modal-submit').click(function() {
	modalCheck('.modal-event2', 'page2', 'end');
});

$('.modal-event2-page3 .modal-submit').click(function() {
	modalNext('.modal-event2', 'page3', 'page4');
});

$('.modal-event2-page4 .modal-submit').click(function() {
	modalNext('.modal-event2', 'page4', 'end');
});

$('.button-event3-1').click(function() {
	hashtagCopy();
});

$('.button-event3-2').click(function() {
	modalOpen('.modal-event3');
});

$('.modal-event3-page1 .modal-submit').click(function() {
	modalNext('.modal-event3', 'page1', 'page3');
});
/*
$('.modal-event3-page2 .modal-submit').click(function() {
	modalNext('.modal-event3', 'page2', 'page3');
});
*/
$('.modal-event3-page3 .modal-back').click(function() {
	modalNext('.modal-event3', 'page3', 'page1');
});

$('.modal-event3-page3 .modal-submit').click(function() {
	modalNext('.modal-event3', 'page3', 'page4');
});

$('.modal-event3-page4 .modal-submit').click(function() {
	modalCheck('.modal-event3', 'page4', 'end');
});

$('.button-gallery').click(function() {
	modalOpen('.modal-gallery');
})

$('.modal-gallery-page1 .modal-submit').click(function() {
	modalNext('.modal-gallery', 'page1', 'end');
});

$('.modal-close').click(function() {
	modalClose();
});

$('.form-read-button').click(function() {
	if (!$(this).hasClass('active')) {
		$('.form-read').addClass('active');
		$('.form-read-button').addClass('active');
	} else {
		$('.form-read').removeClass('active');
		$('.form-read-button').removeClass('active');
	}
});

var winnerList = new Swiper('.winner-list', {
	loop: true,
	autoHeight: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
});

time();

$('.button-result1').click(function() {
	modalOpen('.modal-result1');
	winnerList.update();
});

// 210303 특정시간 팝업 노출

function time(){
	if (new Date() >= new Date('03/03/2021 18:00:00') 
	&& new Date() < new Date('03/04/2021 00:00:00')) { 
		modalOpen('.modal-result1');
		winnerList.update();
	}	
}