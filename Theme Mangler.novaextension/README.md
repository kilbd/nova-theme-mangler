Hey, you – yes, YOU! Are you using a Nova theme that is _SO CLOSE_ to perfect but you wish you could make a handful of modifications? _(slaps hood)_ Then you need to test drive the not-patented **Theme Mangler™**! No need to create your own extension – the perfect theme is a few commands away!

![Three main steps to customizing themes with Theme Mangler](https://github.com/kilbd/nova-theme-mangler/blob/main/assets/using_theme_mangler.gif?raw=true)

## How to Use

1. Install a theme from the Extension Library. Theme Mangler only works on installed themes.
2. Open any project or a blank workspace. The Theme Mangler commands only work in a workspace.
3. Select **Choose a Source Theme** from the **Extensions -> Theme Mangler** menu or from the Command Palette.
4. Select the theme you want to modify from the choice palette that appears.
5. Select **Edit My Custom Styles** from the **Extensions -> Theme Mangler** menu or from the Command Palette.
6. Add your styles to the `user-styles.css` document that opens in your workspace. See _Helpful Hints_ below for tips on how to add these styles.
7. Save the `user-styles.css` document. Your custom theme is generated when you save this file.
8. Close the `user-styles.css` document when you're done. The save listener does not persist across sessions, though you can restart the listener by running the **Edit My Custom Styles** command again.
9. Restart Nova. Nova only picks up changes to themes on startup.
10. If you haven't already, select "My Perfect Theme" in **Nova Preferences -> Theme**.

## Helpful Hints

- Your custom styles need to follow [Panic's guidelines for themes](https://docs.nova.app/extensions/themes/). Though you define styles with CSS, not all CSS features will work – notably custom properties (variables) are not available.
- Use Nova's **syntax inspector** tool to get the name of a "scope" you want to target with your custom style. Unless you're targeting a feature of a specific language, leave off the language name in the scope.
  ![Enable the scope inspector then hover over what you want to target](https://github.com/kilbd/nova-theme-mangler/blob/main/assets/inspector.gif?raw=true)
- **Swatches** are generated from the theme you chose as a source. This makes it easier to ensure you're using colors from the theme. You do need to restart Nova after selecting a source theme for it to pick up the new Swatch group.
  ![Using generated swatch to set the text color](https://github.com/kilbd/nova-theme-mangler/blob/main/assets/swatches.gif?raw=true)
