/**
 * File bsWalker-customizer.js.
 *
 * Reload bsWalker.js after partial refresh has been made on menu. 
 */

(function ($) {
	// Wait for the preview to be ready !
	wp.customize.bind("preview-ready", function () {
		// Fire custom js code after WP Customizer selective refresh has been made.
		if (
			"undefined" !== typeof wp &&
			wp.customize &&
			wp.customize.selectiveRefresh
		) {
			wp.customize.selectiveRefresh.bind("partial-content-rendered", function (
				navMenuPartial
			) {
				if ("menu-1" === navMenuPartial.context.theme_location) {
					// Bootstrap Navbar jQuery Walker.
					let menuClass = $(".navbar-nav"),
						parentMenuItem = $(".navbar-nav .menu-item-has-children"),
						subMenu = $(".navbar-nav .menu-item-has-children .sub-menu");

					menuClass.children("li").addClass("nav-item");
					menuClass.children("li").children("a").addClass("nav-link");
					parentMenuItem.addClass("dropdown");
					parentMenuItem.children("a").addClass("dropdown-toggle");
					parentMenuItem.each(function () {
						let parentMenuItemId = this.id.slice(10);
						$(this).children('a').attr(
							{
								'id': 'menu-item-dropdown-' + parentMenuItemId,
								'href': '#',
								'data-toggle': 'dropdown',
								'aria-haspopup': 'true',
								'aria-expanded': 'false'
							}
						);
					});
					subMenu.addClass("dropdown-menu");
					subMenu.each(function () {
						let parentMenuItemId = this.parentElement.id.slice(10);
						$(this).attr(
							{
								'aria-labelledby': 'menu-item-dropdown-' + parentMenuItemId,
								'role': 'menu'
							}
						);
					});
					subMenu.children("li").addClass("nav-item"); // Blue background on hover/click
					subMenu.find('li.menu-item-has-children').removeClass('dropdown').addClass('dropdown-submenu');
					subMenu.children("li").children("a").addClass("dropdown-item");
					if (!$('.navbar-toggler').hasClass('collapsed')) {
						$('.navbar-toggler').click();
					}
					$("ul.dropdown-menu [data-toggle='dropdown']").click(function (event) {
						event.preventDefault();
						event.stopPropagation();

						$(this).siblings().toggleClass('show');

						if (!$(this).next().hasClass('show')) {
							$(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
						}
						$(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function () {
							$('.dropdown-submenu .show').removeClass('show');
						});
					});
				}
			});
		}
	});
})(jQuery);
