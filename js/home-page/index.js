/** @format */

import "../../scss/organisme/home_page/home_page.scss"

$(document).ready(function () {
	$(".line-carousel").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		centerPadding: "190px",
		draggable: true,
		dots: true,
		arrows: true,
		mobileFirst: true,
		//centerMode: true,
		focusOnSelect: true,
		accessibility: false,
		infinite: true,
		nextArrow: '<div class="arrow-right"></div>',
		prevArrow: '<div class="arrow-left"></div>',
		//asNavFor: ".bigImage",
		responsive: [
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 3,
					centerPadding: "-40px",
					slidesToScroll: 4
				}
			},
			{
				breakpoint: 1224,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
					centerPadding: "-90px"
				}
			},
			{
				breakpoint: 790,
				settings: {
					slidesToShow: 3,
					centerPadding: "-90px"
				}
			},
			{
				breakpoint: 550,
				settings: {
					slidesToShow: 2,
					centerPadding: "-20px"
				}
			}
		]
	})
})

/* service caroussel */
$(".service-carousel").slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	centerPadding: "190px",
	draggable: true,
	dots: true,
	arrows: true,
	//mobileFirst: true,
	//centerMode: true,
	focusOnSelect: true,
	accessibility: false,
	infinite: true,
	nextArrow: '<div class="arrow-right"></div>',
	prevArrow: '<div class="arrow-left"></div>',
	//asNavFor: ".bigImage",
	responsive: [
		{
			breakpoint: 1500,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
				centerPadding: "-40px",
				slidesToScroll: 4
			}
		},

		{
			breakpoint: 790,
			settings: {
				slidesToScroll: 3,
				slidesToShow: 3,
				centerPadding: "-90px"
			}
		},
		{
			breakpoint: 550,
			settings: {
				slidesToShow: 2,
				centerPadding: "-20px"
			}
		}
	]
})
