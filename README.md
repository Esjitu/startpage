modification of [fuyuneko's startpage](https://github.com/yukisuki/startpage/) with icons
====

![screenshot](http://i.imgbox.com/qxVNBi0S.png)


## **Usage**
The easiest way to make changes is by editing `config.json` and `index.html`, both found in the root `startpage` folder. Modify the included icon files as you wish, but do not change their names.

#### **CONFIG.JSON**
 **borders**: Defaults to `true`. Set to `false` to disable the colored strip on the bottom of the link dropdown.
<br>
 **simplesearch**: Defaults to `false`. Set to `true` to only use Google for searching without prefixes.
<br>
**alwaysopen**: Defaults to `false`. Set to `true` to make all squares open by default. **NOTE:** Due to the way I've modified yukisuki's original page, setting this to `false` will make the dropdowns look awkward and is **NOT RECOMMENDED**.
<br>
**mascot**: Defaults to `false`. Set to `true` to enable a mascot image in the bottom right hand corner. Use the `ext` properties to link your image file and position it as you like.

The `style` attributes should explain themselves.

The default colors in the config are designed to match [my custom Firefox CSS](https://github.com/Esjitu/firefox). An alternate `config.json` has been included as well, designed to match the [Arc GTK](https://github.com/horst3180/arc-theme) and [Firefox](https://github.com/horst3180/arc-firefox-theme) themes. Simply copy the file from the `arc config` folder into the root directory and overwrite.

#### **INDEX.HTML**
To add/remove a square just add/remove a `div .sqr` within `div #cell`.<br>
Keep the structure like this:

```<div class="sqr">
    <span>HEADING</span>
    <div class="content">
        <a href="URL">LINK TITLE</a><br>
        <a href="URL">LINK TITLE</a><br>
        ...
        <a href="URL">LINK TITLE</a>
    </div>
</div>```

## **Advanced Search**
This allows the use of special prefixes to search various websites directly through the startpage's search bar.
<br>
For instance, to search for `github` using **Wikipedia**, you would enter `-w github`.

 **no prefix**: Search Google.
<br>
 **-i**: Search Google Images.
<br>
**-w**: Search Wikipedia.
<br>
**-d**: Search Danbooru. Be sure to use underscores (_) for tags with more than one word, and separate multiple tags with a space (ex: `school_uniform 1girl`).
<br>
**-y**: Search YouTube.
<br>
**-n**: Searches Nyaa within the English-Translated Anime category.
<br>
**-p**: Searches Pixiv.

The search engines and prefixes can be modified in `js/main.js`. Don't mess with this if you don't know what you're doing!!

![in action](http://i.imgbox.com/GXoOblE5.gif)
