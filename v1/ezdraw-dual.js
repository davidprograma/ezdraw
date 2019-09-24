let exampleCode = "clear('white');"

let docName = 'ezdraw_example';

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/ezjs;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

ez.onCodeException = function(e)
{
    console.log(e);
    let errmsg = '' + e.toString() + '\n';
    if (e.lineNumber) errmsg += 'at line ' + e.lineNumber;
    if (e.lineNumber) errmsg += ', column ' + e.columnNumber + '\n';
    errmsg += '\n'+ e.stack;
    alert(errmsg);
    ez.e = e;
}

let doc = {};

function changeFont(delta)
{
    let fontsize = parseInt(getComputedStyle(doc.eztext)['font-size']);
    fontsize += delta;
    doc.eztext.style.fontSize = '' + fontsize + 'px';
}

function onLoad()
{
    ez.setup();

    doc.titlebar = document.getElementById('titlebar');
    doc.eztextframe = document.getElementById('eztextframe');
    doc.eztext = document.getElementById('eztext');
    doc.ezdraw = ez.canvas;

    doc.editor = ace.edit('eztext');
    doc.editor.setTheme('ace/theme/chrome');
    doc.editor.session.setMode('ace/mode/javascript');
    doc.editor.focus();

    doc.hta = document.getElementById('hiddenTextArea');
    if (doc.hta.value.length == 0)
    {
        doc.hta.value = exampleCode;
    }

    onResize();

    if (doc.editor.getValue().length == 0)
    {
        //doc.editor.setValue(exampleCode);
        doc.editor.setValue(doc.hta.value);
        doc.editor.selection.clearSelection();
    }

    button = document.getElementById('ezrun');
    button.addEventListener('click', function() {
        ez.setup();
        let code = doc.editor.getValue();
        doc.hta.value = code;
        ez.runSimplifiedCode(code);
    });
    button.click();

    doc.btnIncFont = document.getElementById('incfont');
    doc.btnIncFont.addEventListener('click', function() { changeFont(+1); });

    doc.btnDecFont = document.getElementById('decfont');
    doc.btnDecFont.addEventListener('click', function() { changeFont(-1); });

    doc.btnSave = document.getElementById('btnsave');
    doc.btnSave.addEventListener('click', function() {
        var filename = prompt("Please enter name of script to be saved (without extension)", docName);
        if (filename == null || filename == '')
            return;
        filename += '.ezjs';
        let code = doc.editor.getValue();
        download(filename, code);
    });

    doc.btnLoad = document.getElementById('btnload');
    doc.btnLoad.addEventListener('click', function() {
        var input = document.createElement('input');
        input.type = 'file';
        input.addEventListener('change', function(e)
        {
            var file = event.target.files[0];
            dbg(file);
            if (file.size > 1048576) {
                alert('File is bigger than 1Mb');
                selected_file = null;
                return;
            }

            var reader = new FileReader();
            reader.onload = function(f) {
                var text = reader.result;
                doc.editor.setValue(text);
                doc.editor.selection.clearSelection();
                docName = file.name;
                if (docName.endsWith('.ezjs'))
                    docName = docName.substr(0, docName.length-5);
                button.click();
            };

            reader.onabort = function() { alert('File read aborted'); }
            reader.onerror = function() { alert('File read error'); }

            reader.readAsText(file, 'ascii');
        });
        input.click();    
    });

    doc.btnNew = document.getElementById('btnnew');
    doc.btnNew.addEventListener('click', function() {
        if (confirm('Erase all text in editor and create a new script?')) {
            doc.editor.setValue('');
            doc.editor.selection.clearSelection();
            button.click();
        } else {
            // Do nothing!
        }
    });

    window.addEventListener('keydown', function(e) {
        if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey)
            button.click();
    });
}

function setElementPositionCSS(elem, x, y, w, h)
{
    elem.style.top = "" + y + "px";
    elem.style.left = "" + x + "px";
    elem.style.width = "" + w + "px";
    elem.style.height = "" + h + "px";
}

function onResize()
{
    // w: Window
    // b: title Bar
    // m: Main area
    // c: Canvas
    // t: Text area
    let ww = window.innerWidth;
    let wh = window.innerHeight;

    let bw = ww;
    let bh = parseInt(getComputedStyle(doc.titlebar).height);
    setElementPositionCSS(doc.titlebar, 0, 0, bw, bh)

    let mx = 0;
    let my = bh;
    let mw = ww;
    let mh = wh - bh;

    let marg = 10;

    let ctw, cth;
    let cx, cy, cw, ch;
    let tx, ty, tw, th;

    if (mw > mh)
    {
        ctw = mw - 3 * marg;
        cth = mh - 2 * marg;

        cx = mx + marg;
        cy = my + marg;
        cw = ctw / 2;
        ch = cth;
        setElementPositionCSS(doc.ezdraw, cx, cy, cw, ch);

        tx = mx + marg + cw + marg;
        ty = my + marg;
        tw = ctw / 2;
        th = cth;
        setElementPositionCSS(doc.eztextframe, tx, ty, tw, th);
    }
    else
    {
        ctw = mw - 2 * marg;
        cth = mh - 3 * marg;

        cx = mx + marg;
        cy = my + marg;
        cw = ctw;
        ch = cth / 2;
        setElementPositionCSS(doc.ezdraw, cx, cy, cw, ch);

        tx = mx + marg;
        ty = my + marg + ch + marg;
        tw = ctw;
        th = cth / 2;
        setElementPositionCSS(doc.eztextframe, tx, ty, tw, th);
    }

    ez.resize(cw, ch);
}

window.addEventListener('load', onLoad);
window.addEventListener('resize', onResize);
