/**
 * File bsWalker.js.
 *
 * GitHub Repository : https://github.com/LebCit/bsWalker.js
 * Author: LebCit
 * Author URI: https://github.com/LebCit
 * Description: A lightweight jQuery Walker to implement Bootstrap 4.0+ multilevel dropdown navigation in WordPress.
 * License: GNU General Public License v2 or later
 * License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 *
 * Bootstrap Navbar jQuery Walker.
 * Navigation support for multilevel dropdown menus. 
 */
(function ($) {
	"use strict"; // Start of use strict
	$("#mainNav").fadeIn(500);
	let menuClass = $(".navbar-nav"),
		parentMenuItem = $(".navbar-nav .menu-item-has-children"),
		subMenu = $(".navbar-nav .menu-item-has-children .sub-menu");

	menuClass.children("li").addClass("nav-item");
	menuClass.children("li").children("a").addClass("nav-link");
	parentMenuItem.addClass("dropdown");
	parentMenuItem.children("a").addClass("dropdown-toggle");
	parentMenuItem.each(function () {
		let parentMenuItemId = this.id.slice(10);
		$(this).children("a").attr({
			id: "menu-item-dropdown-" + parentMenuItemId,
			href: "#",
			"data-toggle": "dropdown",
			"aria-haspopup": "true",
			"aria-expanded": "false"
		});
	});
	subMenu.addClass("dropdown-menu");
	subMenu.each(function () {
		let parentMenuItemId = this.parentElement.id.slice(10);
		$(this).attr({
			"aria-labelledby": "menu-item-dropdown-" + parentMenuItemId,
			role: "menu"
		});
	});
	subMenu.children("li").addClass("nav-item"); // Blue background on hover/click
	subMenu.find("li.menu-item-has-children").removeClass("dropdown").addClass("dropdown-submenu");
	subMenu.children("li").children("a").addClass("dropdown-item");
	$("ul.dropdown-menu [data-toggle='dropdown']").click(function (event) {
		event.preventDefault();
		event.stopPropagation();

		$(this).siblings().toggleClass("show");

		if (!$(this).next().hasClass("show")) {
			$(this).parents(".dropdown-menu").first().find(".show").removeClass("show");
		}
		$(this).parents("li.nav-item.dropdown.show").on("hidden.bs.dropdown", function () {
			$(".dropdown-submenu .show").removeClass("show");
		});
	});
})(jQuery); // End of use strict