import * as darkmode from "./darkmode.js";
import * as dialog from "./dialog.js";
import * as highlights from "./highlights.js";
import * as nav from "./nav.js";

new MiniLazyload({
    rootMargin: "500px",
    placeholder: "https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image"
}, ".lazyload", MiniLazyload.IGNORE_NATIVE_LAZYLOAD)
