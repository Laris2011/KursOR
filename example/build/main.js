System.register(["imgui-js", "./imgui_impl.js", "./imgui_demo.js", "./imgui_memory_editor.js"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var ImGui, ImGui_Impl, imgui_demo_js_1, imgui_memory_editor_js_1, font, show_demo_window, show_another_window, clear_color, btn_color, memory_editor, show_sandbox_window, show_gamepad_window, show_movie_window, f, counter, Static, _static_map, demoshown, done, source, image_urls, image_url, image_element, image_gl_texture, video_urls, video_url, video_element, video_gl_texture, video_w, video_h, video_time_active, video_time, video_duration;
    
    //inct
    var menustate = 0;
    var gradientstate = 1;
    var rnb = 0;
    
    //bg
    var image_src = "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/bg1.png";
    var image_texture;
    var image_temp;

    var cmodels = [false,false,false,false,false,false,false,false];
    var itinsoc = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
    var webconstr = [false,false,false,false,false,false,false,false,false,false];
    var oop = [false,false,false,false,false,false,false,false,false,false];

    var images = new Object({
        mod: new Array(),
        soc: new Array(),
        web: new Array(),
        oop: new Array()
    })
    
    var createIMG = (link, category, size) => {
        if(category == 0){
        images.mod.push({
            src: link,
            texture: null,
            temp: null,
            size: size
        });
    }
        if(category == 1){
        images.soc.push({
            src: link,
            texture: null,
            temp: null,
            size: size
        });
    }
        if(category == 2){
        images.web.push({
            src: link,
            texture: null,
            temp: null,
            size: size
        });
    }
        if(category == 3){
        images.oop.push({
            src: link,
            texture: null,
            temp: null,
            size: size
        });
    }
    };
    
    var testlol = false;

    var __moduleName = context_1 && context_1.id;
    function LoadArrayBuffer(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url);
            return response.arrayBuffer();
        });
    }
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            yield ImGui.default();
            if (typeof (window) !== "undefined") {
                window.requestAnimationFrame(_init);
            }
            else {
                function _main() {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield _init();
                        for (let i = 0; i < 3; ++i) {
                            _loop(1 / 60);
                        }
                        yield _done();
                    });
                }
                _main().catch(console.error);
            }
        });
    }
    exports_1("default", main);
    function AddFontFromFileTTF(url, size_pixels, font_cfg = null, glyph_ranges = null) {
        return __awaiter(this, void 0, void 0, function* () {
            font_cfg = font_cfg || new ImGui.FontConfig();
            font_cfg.Name = font_cfg.Name || `${url.split(/[\\\/]/).pop()}, ${size_pixels.toFixed(0)}px`;
            return ImGui.GetIO().Fonts.AddFontFromMemoryTTF(yield LoadArrayBuffer(url), size_pixels, font_cfg, glyph_ranges);
        });
    }
    function HelpMarker(desc) {
        ImGui.TextDisabled("(?)");
        if (ImGui.IsItemHovered()) {
            ImGui.BeginTooltip();
            ImGui.PushTextWrapPos(ImGui.GetFontSize() * 35.0);
            ImGui.TextUnformatted(desc);
            ImGui.PopTextWrapPos();
            ImGui.EndTooltip();
        }
    }
    function UNIQUE(key) { return key; }
    function STATIC(key, init) {
        let value = _static_map.get(key);
        if (value === undefined) {
            _static_map.set(key, value = new Static(init));
        }
        return value;
    }

    function _init() {
        return __awaiter(this, void 0, void 0, function* () {
            const EMSCRIPTEN_VERSION = `${ImGui.bind.__EMSCRIPTEN_major__}.${ImGui.bind.__EMSCRIPTEN_minor__}.${ImGui.bind.__EMSCRIPTEN_tiny__}`;
            console.log("Emscripten Version", EMSCRIPTEN_VERSION);
            console.log("Total allocated space (uordblks) @ _init:", ImGui.bind.mallinfo().uordblks);
            document.title = "КурсОР - Курс на Образование и Развитие";
            // Setup Dear ImGui context
            ImGui.CHECKVERSION();
            ImGui.CreateContext();
            const io = ImGui.GetIO();
            //io.ConfigFlags |= ImGui.ConfigFlags.NavEnableKeyboard;     // Enable Keyboard Controls
            //io.ConfigFlags |= ImGui.ConfigFlags.NavEnableGamepad;      // Enable Gamepad Controls
            // Setup Dear ImGui style
            ImGui.StyleColorsDark();
            //ImGui.StyleColorsClassic();
            // Load Fonts
            // - If no fonts are loaded, dear imgui will use the default font. You can also load multiple fonts and use ImGui::PushFont()/PopFont() to select them.
            // - AddFontFromFileTTF() will return the ImFont* so you can store it if you need to select the font among multiple.
            // - If the file cannot be loaded, the function will return NULL. Please handle those errors in your application (e.g. use an assertion, or display an error and quit).
            // - The fonts will be rasterized at a given size (w/ oversampling) and stored into a texture when calling ImFontAtlas::Build()/GetTexDataAsXXXX(), which ImGui_ImplXXXX_NewFrame below will call.
            // - Read 'docs/FONTS.md' for more instructions and details.
            // - Remember that in C/C++ if you want to include a backslash \ in a string literal you need to write a double backslash \\ !
            io.Fonts.AddFontDefault();
            font = yield AddFontFromFileTTF("../imgui/misc/fonts/Roboto-Medium.ttf", 16);
            font = yield AddFontFromFileTTF("../imgui/misc/fonts/Roboto-Medium.ttf", 18);
            font = yield AddFontFromFileTTF("../imgui/misc/fonts/Roboto-Medium.ttf", 20);
            font = yield AddFontFromFileTTF("../imgui/misc/fonts/Roboto-Medium.ttf", 22);
            font = yield AddFontFromFileTTF("../imgui/misc/fonts/Roboto-Medium.ttf", 24); //npm run start-example-html
            font = yield AddFontFromFileTTF("../imgui/misc/fonts/Roboto-Medium.ttf", 36, null, ImGui.GetIO().Fonts.GetGlyphRangesCyrillic());
            io.FontDefault = io.Fonts.Fonts[2];

            //font.FontConfig
            
            
            // font = await AddFontFromFileTTF("../imgui/misc/fonts/Cousine-Regular.ttf", 15.0);
            // font = await AddFontFromFileTTF("../imgui/misc/fonts/DroidSans.ttf", 16.0);
            // font = await AddFontFromFileTTF("../imgui/misc/fonts/ProggyTiny.ttf", 10.0);
            // font = await AddFontFromFileTTF("c:\\Windows\\Fonts\\ArialUni.ttf", 18.0, null, io.Fonts.GetGlyphRangesJapanese());
            // font = await AddFontFromFileTTF("https://raw.githubusercontent.com/googlei18n/noto-cjk/master/NotoSansJP-Regular.otf", 18.0, null, io.Fonts.GetGlyphRangesJapanese());
            ImGui.ASSERT(font !== null);
            // Setup Platform/Renderer backends
            // ImGui_ImplSDL2_InitForOpenGL(window, gl_context);
            // ImGui_ImplOpenGL3_Init(glsl_version);
            if (typeof (window) !== "undefined") {
                const output = document.getElementById("output") || document.body;
                const canvas = document.createElement("canvas");
                output.appendChild(canvas);
                canvas.tabIndex = 1;
                canvas.style.position = "absolute";
                canvas.style.left = "0px";
                canvas.style.right = "0px";
                canvas.style.top = "0px";
                canvas.style.bottom = "0px";
                canvas.style.width = "100%";
                canvas.style.height = "100%";
                canvas.style.userSelect = "none";
                ImGui_Impl.Init(canvas);
            }
            else {
                ImGui_Impl.Init(null);
            }

            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%92%D0%B8%D0%B4%D1%8B%20%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B5%D0%B9.PNG",0,[1268,510]); // виды моделей
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%98%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8.PNG",0,[1329,628]);//виды инф моделей
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%A6%D0%B5%D0%BB%D0%B8_%D0%BA%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F.PNG",0,[1032,533]);//цели
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%AD%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82_%D0%BF%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B4%D0%B8%D0%BD%D0%B0%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85_%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B5%D0%B9_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC.PNG",0,[983,536]);//элемент построения
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%9C%D0%B5%D1%82%D0%BE%D0%B4%20%D0%9C%D0%BE%D0%BD%D1%82%D0%B5-%D0%9A%D0%B0%D1%80%D0%BB%D0%BE.PNG",0,[1172,531]);//метод монте карло
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/Моделирование популяции.PNG",0,[1637,819]);//популяции
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80.jpg",0,[1196,660]);//пример
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%9B%D0%B5%D0%B3%D0%B5%D0%BD%D0%B4%D0%B0.jpg",0,[1200,720]);//легенда
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%92%D1%8B%D0%B1%D0%BE%D1%80%20%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B0%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85.jpg",0,[1200,623]);//выбор ист данных
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%98%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D1%8F%D0%B4%D0%B0.jpg",0,[1200,696]);//изменение ряда
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%BA%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D0%BE%D0%B5%20%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5.png",0,[571,425]);//компмод

            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%A0%D0%B0%D0%B7%D0%BD%D0%BE%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%B8%D0%B5%20%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC.PNG",1,[1600,641]);//разнообразие систем
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%A2%D0%B0%20%D1%81%D0%B0%D0%BC%D0%B0%D1%8F%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0%202.png",1,[1765,815]);//та самая таблица 2 XD
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%A2%D0%B0%20%D1%81%D0%B0%D0%BC%D0%B0%D1%8F%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0%203.png",1,[1783,799]);//та самая таблица 3 XD
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%94%D0%BE%D1%81%D1%82%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B8%D0%BD%D1%84%20%D1%82%D0%B5%D1%85%D0%BD.PNG",1,[1396,540]);//достижения
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%A7%D0%B5%D1%80%D1%82%D1%8B%20%D0%BE%D0%B1%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%B0%20%D0%B7%D0%BD%D0%B0%D0%BD%D0%B8%D0%B9.PNG",1,[1359,345]);//черты
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%A1%D0%B0%D0%BC%D1%8B%D0%B5%20%D0%B2%D0%BE%D1%81%D1%82%D1%80%D0%B5%D0%B1%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%BF%D1%80%D0%BE%D1%84%D0%B5%D1%81%D1%81%D0%B8%D0%B8%20%D0%B1%D1%83%D0%B4%D1%83%D1%89%D0%B5%D0%B3%D0%BE.PNG",1,[926,528]);//работы
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%9D%D0%B5%D0%BF%D1%80%D0%B8%D0%B5%D0%BC%D0%BB%D0%B8%D0%BC%D1%8B%D0%B5%20%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8F.PNG",1,[917,434]);//этикет
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%91%D0%B0%D0%B7%D0%BE%D0%B2%D1%8B%D0%B5%20%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0%20%D1%81%D0%B5%D1%82%D0%B5%D0%B2%D0%BE%D0%B3%D0%BE%20%D1%8D%D1%82%D0%B8%D0%BA%D0%B5%D1%82%D0%B0.PNG",1,[1073,646]);//базовые прв эт
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%A4%D0%B0%D0%BA%D1%82%D0%BE%D1%80%D1%8B%20%D1%83%D1%8F%D0%B7%D0%B2%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B5%D0%B9.png",1,[835,385]);//факторы уязв
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%9C%D0%B5%D1%80%D1%8B%20%D0%BE%D0%B1%D0%B5%D1%81%D0%BF%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BA%D0%B8%D0%B1%D0%B5%D1%80%D1%83%D1%81%D1%82%D0%BE%D0%B9%D1%87%D0%B8%D0%B2%D0%BE%D1%81%D1%82%D0%B8.PNG",1,[1017,672]);//меры
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8%20%D0%BF%D0%BE%20%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%20%D0%B1%D0%B5%D0%B7.PNG",1,[1330,630]);//меры
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%92%D0%B8%D0%B4%D1%8B%20%D0%BA%D0%B8%D0%B1%D0%B5%D1%80%D0%B0%D1%82%D0%B0%D0%BA.PNG",1,[1636,509]);//виды кбат

            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/e506922fcb280aa9ccbdf97d9d5237861e55e640/pages/styles/img/wordcloud.svg",2,[800,800]);
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA.PNG",2,[1219,738]); //снимок
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%93%D1%80%D0%B0%D1%84%D0%B8%D0%BA%D0%B0.jpg",2,[1180,664]); //графика
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%97%D0%B2%D1%83%D0%BA.jpg",2,[934,787]); //звук
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%92%D0%B8%D0%B4%D0%B5%D0%BE%20%D0%BD%D0%B0%20%D0%B2%D0%B5%D0%B1-%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0%D1%85.PNG",2,[1330,784]); //видео

            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%A1%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%BE%D0%B5%20%D0%9E%D0%9E%D0%9F.PNG",3,[1015,473]); //совр ооп
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%9E%D0%9E%D0%9F%20%D0%92%20PascalABC.PNG",3,[1324,480]); //в паск
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%9A%D0%BD%D0%BE%D0%BF%D0%BA%D0%B0_%D0%BD%D0%B0_%D1%84%D0%BE%D1%80%D0%BC%D0%B5_%D0%9F%D0%BE%D0%B4%D1%87%D0%B5%D1%80%D0%BA%D0%BD%D1%83%D1%82%D1%8B%D0%B9_%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA_Click.PNG",3,[1497,803]); //кнопка на форм
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%9A%D0%BD%D0%BE%D0%BF%D0%BA%D0%B0.%20%D0%98%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%86%D0%B2%D0%B5%D1%82%D0%B0%20%D1%84%D0%BE%D1%80%D0%BC%D1%8B.PNG",3,[754,92]); //изм цв ф
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%A1%D1%82%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%82%D0%BD%D1%8B%D0%B5%20%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D1%8B%20%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%20(2).PNG",3,[1349,390]); //станд эл упр
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%A4%D0%BE%D1%80%D0%BC%D0%B0.%20PictureBox.PNG",3,[1496,631]); //форма
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%9A%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B%20%D0%BC%D0%B5%D0%BD%D1%8E%20(1).jpg",3,[1112,592]); //комп меню
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%94%D0%B8%D0%B0%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D1%8B.PNG",3,[999,828]); //диаграммы
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%93%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9%20%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%BE%D1%80.PNG",3,[1002,721]); //граф р
            createIMG("https://raw.githubusercontent.com/HOLLYCARROT/site/main/pages/styles/img/%D0%93%D1%80%D0%B0%D1%84%D0%B8%D0%BA%20%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8.PNG",3,[776,656]); //график
            
            ImGui.PushStyleColor(ImGui.Col.ScrollbarBg, new ImGui.Vec4(0.861,0.861,0.861,0.530));
            ImGui.PushStyleColor(ImGui.Col.ScrollbarGrab, new ImGui.Vec4(0.524,0.955,0.961,1));
            ImGui.PushStyleColor(ImGui.Col.ScrollbarGrabHovered, new ImGui.Vec4(0.736,0.983,1,1));
            ImGui.PushStyleColor(ImGui.Col.ScrollbarGrabActive, new ImGui.Vec4(1,1,1,1));

            CreateTextures();
            StartUpImage();
            StartUpMainImage();
            StartUpVideo();
            if (typeof (window) !== "undefined") {
                window.requestAnimationFrame(_loop);
            }
        });
    }

    var r = 255,
    g = 0,
    b = 0,
    menuRed = 0.129,
    menuGreen = 0.078,
    menuBlue = 1;

    function rainbow(){
        var isFrames = ImGui.GetFrameCount();
        if(isFrames % 1 == 0) //We use modulus to check if it's divisible by 1, and if the remainder equals 0, then we continue. This effect gets called every frame.
        {
            if (r > 0 && b == 0) {
                r = r - 5;
                g = g + 5;
                menuRed = (1 / 255) * r;
                menuGreen = (1 / 255) * g;
                menuBlue = (1 / 255) * b;
            }
            if (g > 0 && r == 0) {
                g = g - 5;
                b = b + 5;
                menuRed = (1 / 255) * r;
                menuGreen = (1 / 255) * g;
                menuBlue = (1 / 255) * b;
            }
            if (b > 0 && g == 0) {
                r = r + 5;
                b = b - 5;
                menuRed = (1 / 255) * r;
                menuGreen = (1 / 255) * g;
                menuBlue = (1 / 255) * b;
            }

        }
        return new ImGui.Vec4(menuRed, menuGreen, menuBlue, 1.0) //ImGui.COL32(clear_color.x* 0xff, clear_color.y* 0xff, clear_color.z* 0xff, 255)
    }

    function DrawGradientButton(text, size, t){
        let draw_list = ImGui.GetWindowDrawList();
        let txt1 = text;
        const gradient_size = size;
          {
            var p0 = ImGui.GetCursorScreenPos();
            var io = ImGui.GetIO();
            var ptemp = p0;
            const p1 = new ImGui.Vec2(p0.x + gradient_size.x/2, p0.y + gradient_size.y);

            

            const p21 = new ImGui.Vec2(p0.x + gradient_size.x/2, p0.y);
            const p22 = new ImGui.Vec2(p0.x + gradient_size.x, p0.y + gradient_size.y);
            const col_a = ImGui.GetColorU32(ImGui.COL32(255, 255, 255, 255));
            var dx = 1;
            if(io.MousePos.x >= p0.x && io.MousePos.x <= p0.x + gradient_size.x && io.MousePos.y >= p0.y && io.MousePos.y <= p0.y + gradient_size.y){
                dx = 1.1;
            }
            const col_b = ImGui.GetColorU32(ImGui.COL32(clear_color.x* 0xff/dx, clear_color.y* 0xff/dx, clear_color.z* 0xff/dx, 255));
            draw_list.AddRectFilledMultiColor(p0, p1, col_a, col_b, col_b, col_a); 
            draw_list.AddRectFilledMultiColor(p21, p22, col_b, col_a, col_a, col_b);

            ImGui.PushStyleColor(ImGui.Col.Button, new ImGui.Vec4(0,0,0,0));
            ImGui.PushStyleColor(ImGui.Col.ButtonHovered, new ImGui.Vec4(0,0,0,0));
            ImGui.PushStyleColor(ImGui.Col.ButtonActive, new ImGui.Vec4(0,0,0,0));

            ImGui.PushStyleColor(ImGui.Col.Text, new ImGui.Vec4(19/255,148/255,197/255,255));
            ImGui.GetIO().FontGlobalScale = 0.6;
            if(text[0] == "$") {
                ImGui.GetIO().FontGlobalScale = 0.4;// text[0] = "";
                txt1 = "Свернуть";
            }
            
            ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
            if(ImGui.Button(txt1,gradient_size)) {
                if(t != null || t!= "lol") t();
            };
            ImGui.GetIO().FontGlobalScale = 1;
            ImGui.PopFont();
            ImGui.PopStyleColor(4);
            
        }
    }

    var dxx = 0;
    var dyy = 0;
    var da = 0;
    var DrawIMG = (s,size) => {
        const ar = (size / s.size[0]) + dxx;
        let uv_min = new ImGui.Vec2(0.0, 0.0);
        const uv_max = new ImGui.Vec2(1 + da,1 + da);
        let tint_col = new ImGui.Vec4(1.0, 1.0, 1.0, 1.0);
        let border_col = new ImGui.Vec4(1.0, 1.0, 1.0, 0.0);
        ImGui.Image(s.texture, new ImGui.Vec2(size - 16 + f, s.size[1] * (ar) + dyy), uv_min, uv_max, tint_col, border_col); 
        //БРАВО, ОНО ВОРК           
    }
    var DrawButtonHREF = (text,href) => {
        ImGui.GetStyle().ItemSpacing.y *= 2;
        ImGui.PushStyleColor(ImGui.Col.Button, /*(ImGui.Vec4)*/ ImGui.Color.HSV(187/365, 0.635, 1));
        ImGui.PushStyleColor(ImGui.Col.ButtonHovered, /*(ImGui.Vec4)*/ ImGui.Color.HSV(187/365, 0.635, 0.9));
        ImGui.PushStyleColor(ImGui.Col.ButtonActive, /*(ImGui.Vec4)*/ ImGui.Color.HSV(187/365, 0.635, 1));
        ImGui.PushStyleColor(ImGui.Col.Text, /*(ImGui.Vec4)*/ ImGui.Color.HSV(187/365, 0.635, 0.7));  
        ImGui.GetIO().FontGlobalScale = 0.5; 
        ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
        //if(ImGui.Button(text,new ImGui.Vec2(ImGui.GetWindowSize().x,25))) window.open(href);
        ImGui.Button(text,new ImGui.Vec2(ImGui.GetWindowSize().x,25));
        if(ImGui.IsItemHovered() && ImGui.IsMouseReleased(0)) {
            window.open(href);
        }
        ImGui.GetIO().FontGlobalScale = 1;
        ImGui.PopFont();
        ImGui.PopStyleColor(4);
        ImGui.GetStyle().ItemSpacing.y /= 2;
    }

 
    // Main loop
    //npm run start-example-html
    function _loop(time) {
        ImGui_Impl.NewFrame(time);
        ImGui.NewFrame();

        const style = ImGui.GetStyle();
        style.WindowPadding.x = 10;
        style.WindowPadding.y = 10;
        style.WindowRounding = 8;
        let window_flags = 0;
            window_flags |= ImGui.WindowFlags.NoDecoration;
            window_flags |= ImGui.WindowFlags.NoMove;
            window_flags |= ImGui.WindowFlags.NoResize;
            window_flags |= ImGui.WindowFlags.NoBackground;
            window_flags |= ImGui.WindowFlags.NoBringToFrontOnFocus;
            window_flags |= ImGui.WindowFlags.NoScrollWithMouse;

        let viewport = ImGui.GetMainViewport();
        
        ImGui.SetNextWindowPos(new ImGui.Vec2(viewport.WorkPos.x-1, viewport.WorkPos.y-1)); //viewport.WorkPos
        ImGui.SetNextWindowSize(new ImGui.Vec2(viewport.WorkSize.x+1, viewport.WorkSize.y+1)); //viewport.WorkSize

        //let temp1 = ImGui.GetWindowSize().x;
        if(ImGui.Begin("Fullscreen window", null, window_flags)){
            if(gradientstate){
                const draw_list = ImGui.GetWindowDrawList();
                const gradient_size = viewport.WorkSize;//new ImGui.Vec2(ImGui.CalcItemWidth(), ImGui.GetFrameHeight());
                {
                    const p0 = new ImGui.Vec2(0, 0);//ImGui.GetCursorScreenPos();
                    const p1 = new ImGui.Vec2(p0.x + gradient_size.x, p0.y + gradient_size.y);
                    const crs = rainbow();
                    const col_a = rnb ? ImGui.GetColorU32(ImGui.COL32(255*crs.x,255*crs.y,255*crs.z,255)) : ImGui.GetColorU32(ImGui.COL32(clear_color.x* 0xff, clear_color.y* 0xff, clear_color.z* 0xff, 255));
                    const col_b = ImGui.GetColorU32(ImGui.COL32(255, 255, 255, 255));
                    draw_list.AddRectFilledMultiColor(p0, p1, col_a, col_a, col_b, col_b);

                    //ImGui.ImageButton(image_texture, new ImGui.Vec2(971, 991));
                    //ImGui.InvisibleButton("##gradientbg2", gradient_size);

                    //const pos = ImGui.GetCursorScreenPos();  //for tooltip, wip
                    let aspect_ratio = new ImGui.Vec2(1/((ImGui.GetWindowSize().x) / 850), 1/((ImGui.GetWindowSize().y-99) / 866));

                
                   if(menustate == 0){
                        const uv_min = new ImGui.Vec2(0.0, 0.0);
                        const uv_max = new ImGui.Vec2(aspect_ratio.y, aspect_ratio.y);
                        const tint_col = new ImGui.Vec4(1.0, 1.0, 1.0, 1.0);
                        const border_col = new ImGui.Vec4(1.0, 1.0, 1.0, 0.0); // 50% opaque white
                        ImGui.SetCursorPos(new ImGui.Vec2(((ImGui.GetWindowSize().x - (850/aspect_ratio.y))*0.5+1), 100));
                        ImGui.Image(image_texture, new ImGui.Vec2(850, 866), uv_min, uv_max, tint_col, border_col);

                        ImGui.GetIO().FontGlobalScale = 1;
                        ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                        ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize("КурсОР").x)*0.5+1, 26)); 
                        ImGui.TextColored(new ImGui.Vec4(0.0, 0.0, 0.0, 1.0),"КурсОР");
                        ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize("КурсОР").x)*0.5, 25)); 
                        ImGui.Text("КурсОР");
                        if (ImGui.IsItemHovered()) {
                            style.FrameRounding = 0;
                            ImGui.PushStyleColor(ImGui.Col.Border, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.PushStyleColor(ImGui.Col.PopupBg, ImGui.GetColorU32(ImGui.COL32(clear_color.x* 0xff, clear_color.y* 0xff, clear_color.z* 0xff, 255)));
                            ImGui.PushStyleColor(ImGui.Col.Text, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.SetTooltip("Курс на Образование и Развитие");
                            ImGui.PopStyleColor(3); //2
                        }
                        
                        var changecolors = () => {
                            ImGui.PushStyleColor(ImGui.Col.Button, new ImGui.Vec4(0,0,0,0));
                            ImGui.PushStyleColor(ImGui.Col.ButtonHovered, new ImGui.Vec4(0,0,0,0)); //50
                            ImGui.PushStyleColor(ImGui.Col.ButtonActive, new ImGui.Vec4(0,0,0,0));
                            ImGui.PushStyleColor(ImGui.Col.Text, new ImGui.Vec4(0,0,0,0));
                        };
                        style.FrameRounding = 100;
                        style.PopupBorderSize = 3;
                        changecolors();
                        ImGui.SetCursorPos(new ImGui.Vec2(((ImGui.GetWindowSize().x)*0.5) - (100/ aspect_ratio.y) + 2, 100));
                        if(ImGui.Button("Компьютерное моделирование", new ImGui.Vec2(200 / aspect_ratio.y, 200/ aspect_ratio.y))) menustate = 1;
                        ImGui.PopStyleColor(4);
                        if (ImGui.IsItemHovered()) {
                            ImGui.PushStyleColor(ImGui.Col.Border, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.PushStyleColor(ImGui.Col.PopupBg, ImGui.GetColorU32(ImGui.COL32(clear_color.x* 0xff, clear_color.y* 0xff, clear_color.z* 0xff, 255)));
                            ImGui.PushStyleColor(ImGui.Col.Text, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.SetTooltip("Компьютерное моделирование");
                            ImGui.PopStyleColor(3); //2
                        }

                        changecolors();
                        ImGui.SetCursorPos(new ImGui.Vec2(((ImGui.GetWindowSize().x)*0.5) - (100/ aspect_ratio.y) + 2 + (850/3.4/aspect_ratio.y), 100 + 150/aspect_ratio.y));
                        if(ImGui.Button("Информационные технологии в обществе", new ImGui.Vec2(200 / aspect_ratio.y, 200/ aspect_ratio.y))) menustate = 2;
                        ImGui.PopStyleColor(4);
                        if (ImGui.IsItemHovered()) {
                            ImGui.PushStyleColor(ImGui.Col.Border, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.PushStyleColor(ImGui.Col.PopupBg, ImGui.GetColorU32(ImGui.COL32(clear_color.x* 0xff, clear_color.y* 0xff, clear_color.z* 0xff, 255)));
                            ImGui.PushStyleColor(ImGui.Col.Text, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.SetTooltip("Информационные технологии в обществе");
                            ImGui.PopStyleColor(3); //2
                        }
                        changecolors();
                        ImGui.SetCursorPos(new ImGui.Vec2(((ImGui.GetWindowSize().x)*0.5) - (100/ aspect_ratio.y) - 2 - (850/4.3/aspect_ratio.y), 100 + 280/aspect_ratio.y));
                        if(ImGui.Button("Основы веб-конструирования", new ImGui.Vec2(200 / aspect_ratio.y, 200/ aspect_ratio.y))) menustate = 3;
                        ImGui.PopStyleColor(4);
                        if (ImGui.IsItemHovered()) {
                            ImGui.PushStyleColor(ImGui.Col.Border, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.PushStyleColor(ImGui.Col.PopupBg, ImGui.GetColorU32(ImGui.COL32(clear_color.x* 0xff, clear_color.y* 0xff, clear_color.z* 0xff, 255)));
                            ImGui.PushStyleColor(ImGui.Col.Text, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.SetTooltip("Основы веб-конструирования");
                            ImGui.PopStyleColor(3); //2
                        }
                        changecolors();
                        ImGui.SetCursorPos(new ImGui.Vec2(((ImGui.GetWindowSize().x)*0.5) - (100/ aspect_ratio.y) + 2 + (850/4/aspect_ratio.y) - 30/aspect_ratio.y, 100 + 430/aspect_ratio.y));
                        if(ImGui.Button("Введение в ООП", new ImGui.Vec2(200 / aspect_ratio.y, 200/ aspect_ratio.y))) menustate = 4;
                        ImGui.PopStyleColor(4);
                        if (ImGui.IsItemHovered()) {
                            ImGui.PushStyleColor(ImGui.Col.Border, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.PushStyleColor(ImGui.Col.PopupBg, ImGui.GetColorU32(ImGui.COL32(clear_color.x* 0xff, clear_color.y* 0xff, clear_color.z* 0xff, 255)));
                            ImGui.PushStyleColor(ImGui.Col.Text, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.SetTooltip("Введение в ООП");
                            ImGui.PopStyleColor(3); //2
                        }
                        changecolors();
                        ImGui.SetCursorPos(new ImGui.Vec2(((ImGui.GetWindowSize().x)*0.5) - (100/ aspect_ratio.y) - 2 - (850/4.3/aspect_ratio.y) - 30/aspect_ratio.y, 100 + 580/aspect_ratio.y));
                        if(ImGui.Button("Авторы", new ImGui.Vec2(200 / aspect_ratio.y, 200/ aspect_ratio.y))) menustate = 5;
                        ImGui.PopStyleColor(4);
                        if (ImGui.IsItemHovered()) {
                            ImGui.PushStyleColor(ImGui.Col.Border, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.PushStyleColor(ImGui.Col.PopupBg, ImGui.GetColorU32(ImGui.COL32(clear_color.x* 0xff, clear_color.y* 0xff, clear_color.z* 0xff, 255)));
                            ImGui.PushStyleColor(ImGui.Col.Text, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.SetTooltip("Авторы");
                            ImGui.PopStyleColor(3); //2
                        }



                        style.FrameRounding = 0;
                        //ImGui.PopStyleColor(5);
                        ImGui.PopFont();
                   }
                   if(menustate == 1) {
                    ImGui.GetIO().FontGlobalScale = 1;
                    ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                    ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Компьютерное моделирование").x)*0.5+1, 26)); //ImGui.TextColored(new ImGui.Vec4(1.0, 0.0, 1.0, 1.0), "Pink");
                    ImGui.TextColored(new ImGui.Vec4(0.0, 0.0, 0.0, 1.0),"Компьютерное моделирование");
                    ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Компьютерное моделирование").x)*0.5, 25)); //ImGui.TextColored(new ImGui.Vec4(1.0, 0.0, 1.0, 1.0), "Pink");
                    if(ImGui.Text("Компьютерное моделирование")) menustate = 0;


                    var s1 = ImGui.GetStyle();
                    //s1.childPadding
                    //s1.WindowPadding.y = 30;

                    draw_list.AddRectFilled(new ImGui.Vec2(ImGui.GetWindowSize().x/5 - 30, 50 + ImGui.CalcTextSize("AWG").y), new ImGui.Vec2(ImGui.GetWindowSize().x*4 / 5 + 30, ImGui.GetWindowSize().y), ImGui.COL32(255, 255, 255, 255));
                    //draw_list.AddRect(new ImGui.Vec2(ImGui.GetWindowSize().x/5, 50 + ImGui.CalcTextSize("AWG").y), new ImGui.Vec2(ImGui.GetWindowSize().x* 4/5, 50 + ImGui.GetWindowSize().y), ImGui.COL32(255, 255, 255, 255));
                    ImGui.SetCursorPos(new ImGui.Vec2(ImGui.GetWindowSize().x/5, 60 + ImGui.CalcTextSize("AWG").y));
                    {
                        let window_flags = ImGui.WindowFlags.None;
                        window_flags |= ImGui.WindowFlags.AlwaysVerticalScrollbar;
                        //ImGui.PushStyleVar(ImGui.StyleVar.ChildRounding, 5.0);
                        ImGui.PushStyleColor(ImGui.Col.ChildBg, ImGui.COL32(255, 255, 255, 255));
                        ImGui.PushStyleColor(ImGui.Col.Text, ImGui.COL32(0, 0, 0, 255));
                
                        ImGui.BeginChild("Child", new ImGui.Vec2(ImGui.GetWindowSize().x * 4/5 - ImGui.GetWindowSize().x/5, ImGui.GetWindowSize().y - 50 - ImGui.CalcTextSize("AWG").y), false, window_flags);
                        /* if (ImGui.BeginTable("split", 2, ImGui.TableFlags.Resizable | ImGui.TableFlags.NoSavedSettings)) {
                            for (let i = 0; i < 10; i++) {
                                const buf = `${i.toString().padStart(3, "0")}`;
                                ImGui.TableNextColumn();
                                ImGui.Button(buf, new ImGui.Vec2(-1.175494e-38, 0.0));
                            }
                            ImGui.EndTable();
                        } */
                        
                        /* for (let i = 0; i < 5; i++) {
                          DrawGradientButton("test" + i, new ImGui.Vec2(ImGui.GetWindowSize().x, 70), () => {
                            console.log(i);
                            //ImGui.Button("test" + i);
                        });
                        } */
                        ImGui.GetIO().FontGlobalScale = 0.3;
                        DrawGradientButton("Модели и формы их представления", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            cmodels[0] = !cmodels[0];
                        });
                        if(cmodels[0]){ 
                            ImGui.GetIO().FontGlobalScale = 0.5;
                            ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                            ImGui.TextWrapped(" Модель - объект или процесс, который для различных целей рассматривается вместо другого объекта или процесса. На данный момент широко распространены компьютерные модели, представляющие собой информационную модель в виде файла на компьютерном носителе и ее изображение на экране компьютера.\n Создание и использование моделей для решения научных и практических задач называется моделированием. ");
                            ImGui.GetIO().FontGlobalScale = 1;
                            DrawIMG(images.mod[0], ImGui.GetWindowSize().x);
                            DrawIMG(images.mod[1], ImGui.GetWindowSize().x);
                            /* let window_size = ImGui.GetWindowSize();
                            let ar = window_size.x / images.mod[0].size[0];
                            let uv_min = new ImGui.Vec2(0.0, 0.0); // Top-left               ---resize
                            let uv_max = new ImGui.Vec2(ar, ar); // Lower-right 1.0 1.0
                            let tint_col = new ImGui.Vec4(1.0, 1.0, 1.0, 1.0); // No tint
                            let border_col = new ImGui.Vec4(0.0, 0.0, 0.0, 1.0); // 50% opaque white  a 0.5 -> 0.0
                            ImGui.Image(images.mod[0].texture, new ImGui.Vec2(window_size.x, images.mod[0].size[1] * ar), uv_min, uv_max, tint_col, border_col); */
                        }


                        DrawGradientButton("Цели компьютерного моделирования", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            cmodels[1] = !cmodels[1];
                        });
                        if(cmodels[1]){ 
                            DrawIMG(images.mod[2], ImGui.GetWindowSize().x);
                            DrawIMG(images.mod[10], ImGui.GetWindowSize().x);
                        }
                        DrawGradientButton("Современное моделирование", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            cmodels[2] = !cmodels[2];
                        });
                        if(cmodels[2]){ 
                            ImGui.GetIO().FontGlobalScale = 0.5;
                            ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                            ImGui.TextWrapped(" Моделирование в научных исследованиях стало применяться еще в глубокой древности и постепенно захватывало все новые области научных знаний: техническое конструирование, строительство и архитектуру, астрономию, физику, химию, биологию и, наконец, общественные науки. Большие успехи и признание практически во всех отраслях современной науки принес методу моделирования ХХ в.\n\n Актуальность компьютерного моделирования состоит в том, что методами компьютерного моделирования пользуются специалисты практически всех отраслей и областей науки и техники - от истории до космонавтики, поскольку с их помощью можно прогнозировать и даже имитировать явления, события или проектируемые предметы в заранее заданных параметрах.\n\n В современном моделировании реализуется системных подход, состоящий в том, что моделируемый объект представляется в модели как система, т.е. совокупности объектов. Элементы системы могут быть естественными (существующие и просто выделяемые) и искусственными объектами (несуществующие условные единицы).\n Математическая модель системы называется динамической, если она учитывает изменение времени.\n\n Под компьютерным моделированием будем понимать процесс построения, изучения и применения моделей, объектов, изучаемых в технике, медицине, искусстве и других областях деятельности людей, с помощью компьютеров и компьютерных устройств.\n Стоит также отметить, что на данный момент широкое распространение получает трехмерное моделирование. Заключается оно в том, что необходимый объект представляется в виде трехмерной модели. Эта технология получила широкое распространение в современной архитектуре и 3D-печати, а также в киноиндустрии. Например, архитектры создают компьютерные модели городов или отдельных райнов, монтажеры создают невероятные спецэффекты для фильмов, 3D-принтер на основе загруженной в него модели создает физический предмет. ");
                            ImGui.GetIO().FontGlobalScale = 1;

                            
                        };
                        DrawGradientButton("Элементы построения динамических моделей систем", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            cmodels[3] = !cmodels[3];
                        });
                        if(cmodels[3]){ 
                            DrawIMG(images.mod[3], ImGui.GetWindowSize().x);
                        }
                        /* DrawGradientButton("Метод Монте-Карло", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            cmodels[4] = !cmodels[4];
                        });
                        if(cmodels[4]){ 

                            ImGui.GetIO().FontGlobalScale = 0.5;
                            ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                            ImGui.TextWrapped(` Метод Монте-Карло, названный в честь одного из самых знаменитых казино мира, основан на использовании генератора случайных чисел. Также значения генератора случайных чисел называют псевдослучайными числами, поскольку получены они были посредством строгих математических методов и, следовательно, они являются предсказуемыми.
\n На языке PascalABC генератор случайных чисел реализован в стандартной функции random().
 В электронных таблицах MS Excel генератор случайных чисел реализован в функциях СЛЧИС() и СЛУЧМЕЖДУ().
\n Рассмотреть метод Монте-Карло можно на примере задачи определения площади некоторой плоской фигуры.
 Пусть имеется плоская фигура, которая находится внутри прямоугольника (будем называть его базовым) с известной площадью S. Засыплем мысленно прямоугольник тончайшем слоем песка. Если подсчитать общее число песчинок n и число k тех песчинок, которые попали на фигуру, то приближенно площадь фигуры можно считать по формуле C = S * k : n, где С - площадь фигуры.
 Таким образом метод Монте-Карло освобождает нас от необходимости самим разбрасывать и подсчитывать песчинки. Рассмотрим суть метода Монте-Карло на примере задачи определения площади некоторой плоской фигуры. Это приложение метода называют геометрическим методом Монте-Карло.
 Пусть имеется плоская фигура, которая находится внутри пря¬моугольника с известной площадью S0. `);

 DrawIMG(images.mod[4], ImGui.GetWindowSize().x);
                            ImGui.TextWrapped(` Засыплем мысленно прямоугольник тончайшим слоем песка. Прямоугольник с известной площадью в геометрическом методе Монте-Карло будем называть базовым. Если посчитать общее число n песчинок и число k тех песчинок, которые попали на фигуру, то приближенно площадь фигуры можно считать по формуле: S=k*S0/n`);
                            ImGui.GetIO().FontGlobalScale = 1;
                            
                        }
                        DrawGradientButton("Моделирование динамики численности популяций", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            cmodels[5] = !cmodels[5];
                        });
                        if(cmodels[5]){ 
                            ImGui.GetIO().FontGlobalScale = 0.5;
                            ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                            ImGui.TextWrapped(` Для описания динамики изменения численности популяций ученые используют несколько математических моделей. Для двух популяций используются модели взаимодействия двух видов. Среди них модель «хищник-жертва», модель конкуренции двух видов за ресурсы питания, модели взаимовыгодного взаимодействия (симбиоза). `);
                            DrawIMG(images.mod[5], ImGui.GetWindowSize().x);
ImGui.TextWrapped(` В электронных таблицах создадим комплексную компьютерную модель динамики численности четырех популяций, рассмотренных ранее.
 Для расчета численности популяции с неограниченным ростом используем формулу
  x(1) = (1 + a)x(0).
 Для популяции с ограниченным ростом используем формулу
  x(1) = x(0) + (a - bx(0))x(0).
 Для популяции с минимальной критической численностью используем формулу
  x(1) = x(0) + (a - bx(0))·(x(0) - L).
 Для популяции с критической численностью и отловом особей используем формулу
  x(1) = x(0) + (a - bx(0))·(x(0) - L) - Z.
 В исходных данных нужно задать значения параметров, записанных в правых частях этих формул.
 Данные компьютерной расчетной модели разместим по схеме примера: `);

 DrawIMG(images.mod[6], ImGui.GetWindowSize().x);
ImGui.TextWrapped(` Вводим формулы
  A10: =A4/A5 A12: 0
 В ячейки B12:E12 вводим формулу
  =$A$3
 В следующей строке
  A13: =A12+1
 В ячейки B13:E13 нужно ввести правые части четырех расчетных формул. Значение x(0) для формулы в каждом столбце берется из предыдущей строки.
  B13: = (1 + $A$4)*B12
  C13: = C12+($A$4-$A$5*C12)*C12
  D13: =D12+($A$4-$A$5*D12)*(D12-$A$6)
  E13: =E12+($A$4-$A$5*E12)* [1]
  (E12-$A$6)-$A$7
 Формулы моделей требуют доработки.
 Численность популяции в модели неограниченного роста растет очень быстро. Поэтому ограниченные численности остальных трех популяций на совместной диаграмме становятся практически незаметными.
 Чтобы избежать такого эффекта, искусственно ограничим численность в первой модели величиной
  ПЧ =1,1*$A$10,
 пользуясь тем, что в ячейке A10 вычислен предел численности популяции с ограниченным ростом. Для создания ограничения используем функцию ЕСЛИ() и в ячейку B13 вместо формулы модели неограниченного роста ФОРМН введем новую формулу по схеме
  =ЕСЛИ(ФОРМН(ПЧ; ФОРМН; ПЧ).
 Формулы остальных трех моделей в ячейках расчетной таблицы могут выдавать отрицательные значения численности популяций, что нелогично.
 Поэтому вместо формул ФОРМ этих моделей в ячейки С13:E13 введем новые формулы по схеме
  =ЕСЛИ(ФОРМ>0; ФОРМ; 0).
 Формулами диапазона A13:E13 таблица заполняется вниз до строки 47 включительно. Затем надо вывести на лист диаграмму с четырьмя графиками моделей.
 Выделяем диапазон A12:E47 в расчетной таблице, и на лист рабочей книги вставляем точечную диаграмму. Вводим название диаграммы «Динамика численности популяций». В нижнюю часть диаграммы выводится Легенда. `);

 DrawIMG(images.mod[7], ImGui.GetWindowSize().x);
ImGui.TextWrapped(` \nОсталось поменять имена элементов диаграммы. Щелкаем по диаграмме правой клавишей мыши и в контекстном меню выбираем пункт "Выбрать данные …". Появляется диалоговое окно "Выбор источника данных". \n`);
DrawIMG(images.mod[8], ImGui.GetWindowSize().x);
ImGui.TextWrapped(` \nВ диалоговом окне слева выделяем строку "Ряд1" и щелкаем по кнопке "Изменить". Появляется диалоговое окно "Изменение ряда". \n`);
DrawIMG(images.mod[9], ImGui.GetWindowSize().x);
ImGui.TextWrapped(` \nВ верхнее поле "Имя ряда" щелчком по ячейке B11 вводим ссылку на заголовок второго столбца. Нажимаем кнопку OK. Имена остальных рядов изменяем аналогично. `);
                            
                            ImGui.GetIO().FontGlobalScale = 1;
                            
                        } */

                        DrawGradientButton("Задачи", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            cmodels[4] = !cmodels[4];
                        });
                        if(cmodels[4]){ 
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                            DrawButtonHREF("Биологическая задача","https://docs.google.com/presentation/d/1xZ-Kjm-IQ8J3Nc11SkRGUcynFERs9Z4W");
                            DrawButtonHREF('Игра в рулетку',"https://docs.google.com/presentation/d/1QE4D1X0t19VKy0leNn1Kh66YDtoI5PxV");
                            DrawButtonHREF("Метод Монте-Карло","https://docs.google.com/presentation/d/1lR_mByzcx767g535pgJj-cTTjQhp7KIy");
                            DrawButtonHREF("Выбор железнодорожной станции","https://docs.google.com/presentation/d/1xEO0_Q-2TImHJcqm01UYqeCMM7cX0Bmp");
                            DrawButtonHREF("Биоритмы человека","https://docs.google.com/presentation/d/1e3LIb2nT9BwySvrWJ9_ZfL3DYuYhHwK3");
                            DrawButtonHREF("Финансовая задача","https://docs.google.com/presentation/d/1IfwhhvGYRwGBIwpowtcrOeRWmI69y4L7");
                            DrawButtonHREF("Шифрование","https://docs.google.com/presentation/d/1z2ZYDpVzQn0jZfqZznnnC-UnNt07KjP0");
                            DrawButtonHREF("Экологическая задач","https://docs.google.com/presentation/d/16fR8neMUwvilAV9FYPehzKhXXHllRYfu");
                            DrawButtonHREF("Температурные режимы","https://docs.google.com/presentation/d/1-8gMTk-qHQUpjJL8CeKAVO3Dz_jIEPJy");
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                        }

                        DrawGradientButton("Teория", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            cmodels[6] = !cmodels[6];
                        });
                        if(cmodels[6]){ 
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                            DrawButtonHREF("Компьютерное моделирование","https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D0%BE%D0%B5_%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5");
                            DrawButtonHREF("Компьютерное информационные модели","https://eior.by/catalog_lecture/11-klass/informatika/10.php");
                            DrawButtonHREF("Проектирование интерфейса оконного приложения с использованием элементов управления","https://eior.by/catalog_lecture/11-klass/informatika/2.php");
                            DrawButtonHREF("Моделирование случайных событий. Метод Монте-Карло","https://eior.by/catalog_lecture/11-klass/informatika/11.php");
                            DrawButtonHREF("Вычисление значения числа Pi методом Монте-Карло","https://eior.by/catalog_lecture/11-klass/informatika/12.php");
                            DrawButtonHREF("Вычисление площади фигуры методом Монте-Карло","https://eior.by/catalog_lecture/11-klass/informatika/13.php");
                            DrawButtonHREF("Модель «хищник-жертва»","https://eior.by/catalog_lecture/11-klass/informatika/15.php");
                            DrawButtonHREF("Моделирование динамики численности популяций","https://bit.ly/3NVfMK4");
                            DrawButtonHREF("Моделирование в задачах преследования","https://drive.google.com/file/d/1Epijn0_RtkHD3vR9J_YM6AO8xu2f_He3");
                            DrawButtonHREF("3D-моделирование интерьеров. Модель строительной оболочки","https://eior.by/catalog_lecture/11-klass/informatika/16.php");
                            DrawButtonHREF("Сборник задач по моделированию","https://drive.google.com/drive/folders/15jODiBS6DDmfj-qBryVmJrNVQXLCA4uQ?usp=share_link");
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                        }
                        DrawGradientButton("Тесты", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            cmodels[7] = !cmodels[7];
                        });
                        if(cmodels[7]){ 
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                            DrawButtonHREF("Компьютерные информационные модели","https://docs.google.com/forms/d/e/1FAIpQLSf0ffQ7AQ_E_exh3ujpR4RCegtc5wEdr9wM6a8vFGoOPP_Zgw/viewform");
                            DrawButtonHREF("Проектирование интерфейса оконного приложения с использованием элементов управления","https://docs.google.com/forms/d/e/1FAIpQLSeBJ57VLAcZn58Y15Gl8xuu5wuwD0n9nrAtqEP2AYK-sfGPJQ/viewform");
                            DrawButtonHREF("Моделирование случайных событий. Метод Монте-Карло","https://docs.google.com/forms/d/e/1FAIpQLSdLhAfy4umZ-D4CtJae8uDuN-EwcGrEWgFWDDPqoosjTOhz9A/viewform");
                            DrawButtonHREF("Вычисление значения числа pi методом Монте-Карло","https://docs.google.com/forms/d/e/1FAIpQLSczVHhPz0FYuM5if1HYrs3qZFX_N-gWG-Gm36YPFoGa_b1_IA/viewform");
                            DrawButtonHREF("Вычисление площади фигуры методом Монте-Карло","https://docs.google.com/forms/d/e/1FAIpQLSdtcaHJhO27LcuenfDtrG1iAfEzrpvI5GxJjNm2cu8eaR0wHw/viewform");
                            DrawButtonHREF("Моделирование динамики численности популяций","https://docs.google.com/forms/d/e/1FAIpQLScKMCGDugu8TQcZGciILpkXYX450Jg3KdvRS26K1LaIhp3zGw/viewform");
                            DrawButtonHREF("3D - моделирование интерьеров. Модель строительной оболочки","https://docs.google.com/forms/d/e/1FAIpQLSc3ZieHDONwY5JDSv9e8Sbd6xxA3h7Ni_dAjBEe_CTsJplmbw/viewform");
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                        }
                        DrawGradientButton("Назад", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            menustate = 0;
                        });
                        ImGui.EndChild();
                        ImGui.PopStyleColor();
                        //ImGui.PopStyleVar();
                    }
                   }

                   if(menustate == 2) {
                    ImGui.GetIO().FontGlobalScale = 1;
                    ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                    ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Информационные технологии в обществе").x)*0.5+1, 26)); //ImGui.TextColored(new ImGui.Vec4(1.0, 0.0, 1.0, 1.0), "Pink");
                    ImGui.TextColored(new ImGui.Vec4(0.0, 0.0, 0.0, 1.0),"Информационные технологии в обществе");
                    ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Информационные технологии в обществе").x)*0.5, 25)); //ImGui.TextColored(new ImGui.Vec4(1.0, 0.0, 1.0, 1.0), "Pink");
                    if(ImGui.Text("Информационные технологии в обществе")) menustate = 0;


                    var s1 = ImGui.GetStyle();

                    draw_list.AddRectFilled(new ImGui.Vec2(ImGui.GetWindowSize().x/5 - 30, 50 + ImGui.CalcTextSize("AWG").y), new ImGui.Vec2(ImGui.GetWindowSize().x*4 / 5 + 30, ImGui.GetWindowSize().y), ImGui.COL32(255, 255, 255, 255));
                    ImGui.SetCursorPos(new ImGui.Vec2(ImGui.GetWindowSize().x/5, 60 + ImGui.CalcTextSize("AWG").y));
                    {
                        let window_flags = ImGui.WindowFlags.None;
                        window_flags |= ImGui.WindowFlags.AlwaysVerticalScrollbar;
                        ImGui.PushStyleColor(ImGui.Col.ChildBg, ImGui.COL32(255, 255, 255, 255));
                        ImGui.PushStyleColor(ImGui.Col.Text, ImGui.COL32(0, 0, 0, 255));
                        ImGui.BeginChild("Child", new ImGui.Vec2(ImGui.GetWindowSize().x * 4/5 - ImGui.GetWindowSize().x/5, ImGui.GetWindowSize().y - 50 - ImGui.CalcTextSize("AWG").y), false, window_flags);
                        
                        
                        ImGui.GetIO().FontGlobalScale = 0.3;

                        DrawGradientButton("Информационные системы, технологии", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[0] = !itinsoc[0];
                        });
                        if(itinsoc[0]){  
ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Реальные объекты и явления, наблюдаемые нами в мире, очень сложные, поэтому их принято рассматривать в виде системы. Система состоит из нескольких элементов, каждый выполняет свою функцию. Для лучшего понимания темы предлагаем рассмотреть следующую таблицу с примерами: `);
DrawIMG(images.soc[0], ImGui.GetWindowSize().x);         
ImGui.GetIO().FontGlobalScale = 1;
};


                        DrawGradientButton("Информационная система", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[1] = !itinsoc[1];
                        });
                        if(itinsoc[1]){
ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` В современном обществе широко распространено такое явление, как информационная система. Информационная система - это система, элементами которой являются данные, технические средства, специалисты, а связи образуются благодаря потокам информационных процессов.
 Современные информационные системы являются автоматизированными, вот некоторые примеры: `);
DrawIMG(images.soc[1], ImGui.GetWindowSize().x); 
ImGui.GetIO().FontGlobalScale = 1;  
                        };

                        DrawGradientButton("Информационные технологии в обществе", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[2] = !itinsoc[2];
                        });
                        if(itinsoc[2]){
ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Информационная технология - совокупность способов, приемов и методов сбора, обработки и передачи данных. Такие технологии применяются во всех областях человеческой деятельности, а их инструментами являются аппаратное, программное и математическое обеспечение. Технологический процесс разбивают на этапы. Каждый этап состоит из операций и действий, приводящих к получению пользователем того, что он ожидает получить.
Для того чтобы использовать информационные технологии грамотно, нам необходимо узнать их классификацию из специальной таблицы ниже: `);
DrawIMG(images.soc[2], ImGui.GetWindowSize().x); 
ImGui.GetIO().FontGlobalScale = 1;  
                        };

                        DrawGradientButton("Информатизация общества", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[3] = !itinsoc[3];
                        });
                        if(itinsoc[3]){
ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Основой информационного общества является широкое использование информационных технологий во всех сферах деятельности человека. Такое общество отличается от индустриального высоким развитием информатики.
Переход от индустриального общества к информационному подразумевает информатизацию.
Информатизация - организационный социально-экономический и научно-технический процесс создания оптимальных условий для удовлетворения информационных потребностей людей.
Важным в информатизации является наличие информационной культуры - совокупности знаний и умений человека, представленной в виде правил его поведения в информационном обществе. `);
ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("Виртуальная реальность", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[4] = !itinsoc[4];
                        });
                        if(itinsoc[4]){
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Неотъемлемой частью современного мира становятся технологии виртуальной и дополненной реальности.
Виртуальная реальность - созданный техническими средствами мир, передаваемый человеку через его ощущения. Для погружения в неё используйте шлемы, очки или комнаты виртуальной реальности
Дополненная реальность - технологии, которые дополняют реальный мир, добавляя любые сенсорные данные. Чтобы испытать такое на себе, достаточно обзавестись очками или шлемом дополненной реальности, можно также использовать смартфон или планшет.
Сфера применения таких технологий достаточно широка - им находят применение в медицине, образовании, инженерии и сфере развлечений.
Новейшие достижения этих технологий указаны ниже: `);
DrawIMG(images.soc[3], ImGui.GetWindowSize().x); 
ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("Образование и профессиональная деятельность в информационном обществе", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[5] = !itinsoc[5];
                        });
                        if(itinsoc[5]){
ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` В современном мире ключевое значение имеют знания. Для обозначения этого феномена используется термин «общество знаний». Его характерные черты указаны в таблице: `);
DrawIMG(images.soc[4], ImGui.GetWindowSize().x); 
ImGui.TextWrapped(` В «обществе знаний» инофрмационные технологии являются средством получения и усваивания новой информации.
На основе владения информацией о самых различных процессах и явлениях можно эффективно и оптимально строить любую деятельность. При этом повышается не только качество потребления, но и качество производства: человек, использующий информационные технологии, имеет лучшие условия труда. Основным критерием развитости информационного общества можно считать количество населения, занятого в информационной сфере и использующего информационные и коммуникационные технологии в своей повседневной деятельности. В настоящее время достаточно много интернет-ресурсов предлагают обзоры профессий, которые будут актуальными в ближайшее время. Примеры таких должностей указаны ниже: `);
DrawIMG(images.soc[5], ImGui.GetWindowSize().x); 
ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("Сетевой этикет", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[6] = !itinsoc[6];
                        });
                        if(itinsoc[6]){
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Сетевой этикет - это система правил, созданная людьми для общения друг с другом в сети Интернет. Этикет общения в Интернете рекомендуется соблюдать новичкам и опытным пользователям для комфорта. Однозначно сказать, что такое сетевой этикет невозможно, но в большинстве случаев это правила хорошего тона, общепринятые среди людей.
Соблюдение правил хорошего тона повышает авторитет собеседника и привлекает внимание.
Чтобы ответить на вопрос, как общаться в Интернете, следует узнать, что не рекомендуется делать. Сетевой этикет подразумевает отказ от следующих действий: `);
DrawIMG(images.soc[6], ImGui.GetWindowSize().x); 
ImGui.TextWrapped(` Вместо всего вышеперечисленного, лучше показать себя культурным и приличным человеком, придерживаясь базовых правил сетевого этикета: `);
DrawIMG(images.soc[7], ImGui.GetWindowSize().x); 
ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("Кибербезопасность", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[7] = !itinsoc[7];
                        });
                        if(itinsoc[7]){
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` В современном информационном обществе самым важным ресурсом являются данные. Их утечка или утеря могут создать много трудностей как рядовым пользователям, так и крупным компаниям. Именно поэтому так важно задумываться о безопасности и сохранности своих данных в сети.

 Кибербезопасность - это состояние защищенности информационной инфраструктуры и содержащейся в ней информации от внешних и внутренних угроз. `);
ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("Уязвимости", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[8] = !itinsoc[8];
                        });
                        if(itinsoc[8]){
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Уязвимость - свойство информационной инфраструктуры или её объектов, которое позволяет реализовать угрозу. Факторы уязвимостей приведены ниже:`);
DrawIMG(images.soc[8], ImGui.GetWindowSize().x); 
ImGui.TextWrapped(` Таким образом, происходит переход в состояние киберустойчивости - способности информационной инфраструктуры успешно и предотвращать реализацию угроз, и быстро восстанавливаться.
Для обеспечения киберустойчивости необходимо принять следующие меры: `);
DrawIMG(images.soc[9], ImGui.GetWindowSize().x); 
ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("Профессии, связанные с кибербезопасностью", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[9] = !itinsoc[9];
                        });
                        if(itinsoc[9]){
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Информационная безопасность - одно из самых перспективных направлений в сфере ИТ. Профессионалы в области кибербезопасности защищают компании от утечек данных и прочих угроз. Ниже представлены некоторые основные специализации: `);
DrawIMG(images.soc[10], ImGui.GetWindowSize().x); 
ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("Кибератаки", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[10] = !itinsoc[10];
                        });
                        if(itinsoc[10]){
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Кибератака - умышленное воздействие на информационную структуру с помощью программ. `);
DrawIMG(images.soc[11], ImGui.GetWindowSize().x); 
ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("Киберустойчивость", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[11] = !itinsoc[11];
                        });
                        if(itinsoc[11]){
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Кибербезопасность требует грамотного обеспечения: наличия системы мер защиты информационной инфраструктуры и противодействия угрозам информационной безопасности.
Таким образом происходит переход в состояние киберустойчивости - способности информационной инфраструктуры успешно предотвращать реализацию угроз или быстро восстанавливаться после их реализации. `);
ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        /* DrawGradientButton("Итог", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[12] = !itinsoc[12];
                        });
                        if(itinsoc[12]){
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Подводя итог, стоит сказать, что никакие программы и устройства не защитят вас, если злоумышленник завладеет вашим доверием, поэтому лучшая защита от кибератак - ваши осторожность и бдительность. `);
ImGui.GetIO().FontGlobalScale = 1; 
                        }; */

                        DrawGradientButton("Теория", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[13] = !itinsoc[13];
                        });
                        if(itinsoc[13]){
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                            DrawButtonHREF("Информационные системы и технологии","https://drive.google.com/file/d/1IufwBqpSopSOLmnk5BxXj7tIiSVD_4N2");
                            //DrawButtonHREF('Информационные системы и технологии',"https://drive.google.com/file/d/1-Myd6mQLEEoDdFhMbmk13fe4pvbvYnr-");
                            DrawButtonHREF('Кибербезопасность - это взаимодействие людей',"https://drive.google.com/file/d/1-Myd6mQLEEoDdFhMbmk13fe4pvbvYnr-");
                            DrawButtonHREF('Технологии будущего',"https://drive.google.com/file/d/1baXO9NqszIi3lVy6uhNEFsQF3axi9sQS");
                            DrawButtonHREF('Жертвы компьютерного мошенничества',"https://drive.google.com/file/d/1K0TVaIMKXgINJmEwYeIfHWF_IbqCwLIg");
                            DrawButtonHREF('Законодательство РБ в области Кибербезопасности',"https://drive.google.com/file/d/1shlp8fN6YE2PNV1LD4rYcJjoWbV-frdv");
                            DrawButtonHREF('Как обезопасить себя',"https://drive.google.com/file/d/1-CnX33qoADJgOkhcD1luvBrwj9Abi9oU");
                            DrawButtonHREF('Как справляться с грубостью',"https://drive.google.com/file/d/12Z1ofXU-YVeyKlpU0hNBL3hZvQNxa0_u");
                            DrawButtonHREF('Интернет-безопасность детей',"https://drive.google.com/file/d/1OPklRcs3dWdmE9bwUysiX_oCf14Fkp7y");
                            DrawButtonHREF('Глоссарий',"https://drive.google.com/file/d/1J6fCrQpCky4ALH5Yt1hQN29FTok9XaOd");
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                        };

                        DrawGradientButton("Тесты", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[14] = !itinsoc[14];
                        });
                        if(itinsoc[14]){
                            /* DrawGradientButton("$Свернуть", new ImGui.Vec2(100, 25), ()=>{
                                itinsoc[14] = false;
                            }); */
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                            DrawButtonHREF('Безопасность в сети Интернет',"https://docs.google.com/forms/d/e/1FAIpQLSft0zf_ca1F2lwglCmh-GW8KQfv8e49VgZegJ77Ue9tus-D5g/viewform");
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                        };

                        DrawGradientButton("Назад", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            menustate = 0;
                        });

                        ImGui.EndChild();
                        ImGui.PopStyleColor();
                    }
                   }
                   if(menustate == 3) {
                    ImGui.GetIO().FontGlobalScale = 1;
                    ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                    ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Основы веб-конструирования").x)*0.5+1, 26)); //ImGui.TextColored(new ImGui.Vec4(1.0, 0.0, 1.0, 1.0), "Pink");
                    ImGui.TextColored(new ImGui.Vec4(0.0, 0.0, 0.0, 1.0),"Основы веб-конструирования");
                    ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Основы веб-конструирования").x)*0.5, 25)); //ImGui.TextColored(new ImGui.Vec4(1.0, 0.0, 1.0, 1.0), "Pink");
                    if(ImGui.Text("Основы веб-конструирования")) menustate = 0;


                    var s1 = ImGui.GetStyle();

                    draw_list.AddRectFilled(new ImGui.Vec2(ImGui.GetWindowSize().x/5 - 30, 50 + ImGui.CalcTextSize("AWG").y), new ImGui.Vec2(ImGui.GetWindowSize().x*4 / 5 + 30, ImGui.GetWindowSize().y), ImGui.COL32(255, 255, 255, 255));
                    ImGui.SetCursorPos(new ImGui.Vec2(ImGui.GetWindowSize().x/5, 60 + ImGui.CalcTextSize("AWG").y));
                    {
                        let window_flags = ImGui.WindowFlags.None;
                        window_flags |= ImGui.WindowFlags.AlwaysVerticalScrollbar;
                        ImGui.PushStyleColor(ImGui.Col.ChildBg, ImGui.COL32(255, 255, 255, 255));
                        ImGui.PushStyleColor(ImGui.Col.Text, ImGui.COL32(0, 0, 0, 255));
                        ImGui.BeginChild("Child", new ImGui.Vec2(ImGui.GetWindowSize().x * 4/5 - ImGui.GetWindowSize().x/5, ImGui.GetWindowSize().y - 50 - ImGui.CalcTextSize("AWG").y), false, window_flags);
                        
                        
                        ImGui.GetIO().FontGlobalScale = 0.3;

                        DrawGradientButton("Веб-сайт", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[0] = !webconstr[0];
                        });
                        if(webconstr[0]){
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
DrawIMG(images.web[0], ImGui.GetWindowSize().x);
ImGui.TextWrapped(` Веб-сайт представляет собой группу веб-страниц, связанных между собой гиперссылками. Существует четыре основных типа веб-сайтов:\n\n`);
ImGui.BulletText("  Презентационные - реклама и продвижение определенных услуг и акций.");
ImGui.BulletText("  Корпоративные - представляют компанию или предприятие.");
ImGui.BulletText("  Онлайн-сервисы - направлены на повседневные нужды.");
ImGui.BulletText("  Электронные магазины - созданы для получения прибыли от продажи товаров.");
ImGui.TextWrapped(`\nПо технологии создания сайты делят на статические (информация хранится на сервере и отображается в браузере в одном и том же виде) и динамические (частично, а то и полностью генерируются в браузере или на сервере в процессе исполнения запроса пользователя).
Также сайты разделяют в зависимости от типа взаимодействия с пользователем. Бывают пассивные сайты (информацию на них можно только просматривать) и интерактивные (предусмотрена возможность обмена данными с сервером).
Все веб-страницы являются гипертекстовыми документами. Язык HTML (HyperText Markup Language) является одним из самых распространенных языков создания веб-сайтов. На этом языке задаются параметры и структура веб-страниц. Документы, написанные на языке HTML, имеют расширение .html. Основные компоненты этого языка - теги и атрибуты.

  Теги - набор специальных символов языка HTML, которые идентифицируют html-документ, задают параметры страницы, определяют разделы и положение элементов на ней.\n\n`);

ImGui.BulletText("  <html> - идентифицирует код html-документ, в него входят контейнеры <head> и <body>.");
ImGui.BulletText("  <head> - содержит название документа, теги для поисковых машин. Эти данные не будут отображаться на исходной веб-странице.");
ImGui.BulletText("  <body> - контейнер, который содержит отображающуюся на странице информацию.");

ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("Создание веб-страниц", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[1] = !webconstr[1];
                        });
                        if(webconstr[1]){
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Важно понимать, что для создания веб-сайта важно не столько знание самого языка программирования, сколько излагающейся на сайте темы. Чтобы создать свой веб-сайт, достаточно воспользоватьмся протстым блокнотом, который есть на каждом компьютере, или другим текстовым редактором, или специальной программой для написания html-кода, или визуальным веб-редактором, или специальным конструктором сайтов. В случае с двумя последними создание веб-страниц окажется даже легче, ведь для работы с ними в принципе нет необходимости знать языка HTML. При работе с текстовым редактором документ нужно сохранять с расширением .html.

  Любая веб-страница содержит следующие элементы:\n\n`);
ImGui.BulletText("  Заголовок (часто - логотип)");
ImGui.BulletText("  Основная часть (размещение контента)");
ImGui.BulletText("  Элементы навигации (например, меню)");
ImGui.BulletText("  Нижний колонтитул (размещение информации о разработчике или контактных данных)");
ImGui.BulletText("  Боковые панели (размещение ссылок, рекламы и т.д)");
ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("Каскадные таблицы стилей", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[2] = !webconstr[2];
                        });
                        if(webconstr[2]){
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` CSS (Cascading Style Sheets) - формальный язык описания внешнего вида документа. CSS дополняет возможности HTML.

Вынесение стилей документа в отдельный файл значительно упрощает создание веб-сайтов, поскольку отпадает необходимость отдельно прописывать параметры для каждого элемента веб-страницы.

  Способы подключения CSS к документу:\n\n`);
ImGui.BulletText("  Встроенные стили - непосредственно в открывающем теге.");
ImGui.BulletText("  Таблицы стилей - стилевое описание для всех идентичных элементов. Задаются тегом <style>.");
ImGui.BulletText("  Внешние таблицы стилей - отдельные файлы с расширением .css, которые содержат стилевые правила.");
DrawIMG(images.web[1], ImGui.GetWindowSize().x);
ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("Графика на веб-страницах", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[3] = !webconstr[3];
                        });
                        if(webconstr[3]){
                            DrawIMG(images.web[2], ImGui.GetWindowSize().x);
                        };

                        DrawGradientButton("Звук на веб-страницах", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[4] = !webconstr[4];
                        });
                        if(webconstr[4]){
                            DrawIMG(images.web[3], ImGui.GetWindowSize().x);
                        };

                        DrawGradientButton("Видео на веб-страницах", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[5] = !webconstr[5];
                        });
                        if(webconstr[5]){
                            DrawIMG(images.web[4], ImGui.GetWindowSize().x);
                        };

                        DrawGradientButton("Этапы создания веб-сайта", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[6] = !webconstr[6];
                        });
                        if(webconstr[6]){
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Создание веб-сайта - это не только написание кода. Это процесс, включающий в себя следующие основные этапы:\n\n`);
ImGui.BulletText("  Проектирование (поставить цели и задачи сайта).");
ImGui.BulletText("  Разработка структуры (грамотно распределить информацию по веб-страницам).");
ImGui.BulletText("  Создание дизайна (продумать графическую составляющую, цветовую палитру сайта).");
ImGui.BulletText("  Создание мультимедиа-компонентов (создать графическую и звуковую составляющую, видео).");
ImGui.BulletText("  Верстка страниц и шаблонов (создать html-код).");
ImGui.BulletText("  Программирование (при создании сложного многофункционального сайта).");
ImGui.BulletText("  Наполнение контентом.");
ImGui.BulletText("  Тестирование и внесение корректировок.");
ImGui.BulletText("  Публикация сайта на хостинге.");
ImGui.BulletText("  Дальнейшее обслуживание.");
ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("Теория", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[7] = !webconstr[7];
                        });
                        if(webconstr[7]){
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                            DrawButtonHREF('Основы веб-конструирования',"https://eior.by/catalog_lecture/11-klass/informatika/5.php");
                            DrawButtonHREF('Создание веб-страниц',"https://eior.by/catalog_lecture/11-klass/informatika/6.php");
                            DrawButtonHREF('Рефлексия урока',"https://drive.google.com/file/d/1VHuRNjjrJQ0-FZwIOmmHJ46zNZz-FGIx");
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                        };

                        DrawGradientButton("Тесты", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[8] = !webconstr[8];
                        });
                        if(webconstr[8]){
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                            DrawButtonHREF('Основные понятия',"https://docs.google.com/forms/d/e/1FAIpQLScePAZBecVAkamQxLG7TR19FlFgpW6gGXiDA7slii3rLtmw-A/viewform");
                            DrawButtonHREF('Основы веб-конструирования',"https://docs.google.com/forms/d/e/1FAIpQLSfRCyPfSKewAYtlG4DTo1FMfZbJ_uLrr7IA_i3OmDozTHSK6A/viewform");
                            DrawButtonHREF('Создание веб-страниц',"https://docs.google.com/forms/d/e/1FAIpQLSdxIBpix5-EDnMH9OfGyPwqJBZv0B73WGsa0ZLkre3yiPgJcw/viewform");
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                        };

                        DrawGradientButton("Назад", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            menustate = 0;
                        });

                        ImGui.EndChild();
                        ImGui.PopStyleColor();
                    }
                   }
                   if(menustate == 4) {
                    ImGui.GetIO().FontGlobalScale = 1;
                    ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                    ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Введение в ООП").x)*0.5+1, 26)); //ImGui.TextColored(new ImGui.Vec4(1.0, 0.0, 1.0, 1.0), "Pink");
                    ImGui.TextColored(new ImGui.Vec4(0.0, 0.0, 0.0, 1.0),"Введение в ООП");
                    ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Введение в ООП").x)*0.5, 25)); //ImGui.TextColored(new ImGui.Vec4(1.0, 0.0, 1.0, 1.0), "Pink");
                    if(ImGui.Text("Введение в ООП")) menustate = 0;


                    var s1 = ImGui.GetStyle();

                    draw_list.AddRectFilled(new ImGui.Vec2(ImGui.GetWindowSize().x/5 - 30, 50 + ImGui.CalcTextSize("AWG").y), new ImGui.Vec2(ImGui.GetWindowSize().x*4 / 5 + 30, ImGui.GetWindowSize().y), ImGui.COL32(255, 255, 255, 255));
                    ImGui.SetCursorPos(new ImGui.Vec2(ImGui.GetWindowSize().x/5, 60 + ImGui.CalcTextSize("AWG").y));
                    {
                        let window_flags = ImGui.WindowFlags.None;
                        window_flags |= ImGui.WindowFlags.AlwaysVerticalScrollbar;
                        ImGui.PushStyleColor(ImGui.Col.ChildBg, ImGui.COL32(255, 255, 255, 255));
                        ImGui.PushStyleColor(ImGui.Col.Text, ImGui.COL32(0, 0, 0, 255));
                        ImGui.BeginChild("Child", new ImGui.Vec2(ImGui.GetWindowSize().x * 4/5 - ImGui.GetWindowSize().x/5, ImGui.GetWindowSize().y - 50 - ImGui.CalcTextSize("AWG").y), false, window_flags);
                        

                        DrawGradientButton("ООП", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[0] = !oop[0];
                        });
                        if(oop[0]){
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Объектно-ориентированное программирование (ООП) - технология создания программ, в основе которой лежит использование объектов, являющихся экземпляром определенного класса, и методов, характеризующих их поведение. `);
DrawIMG(images.oop[0], ImGui.GetWindowSize().x);
ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("ООП в Pascal", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[1] = !oop[1];
                        });
                        if(oop[1]){
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Рассмотрим ООП на примере PascalABC. `);
DrawIMG(images.oop[1], ImGui.GetWindowSize().x);
ImGui.TextWrapped(` Разместим на форме кнопку. Чтобы создать обработчик события для нажатия на кнопку левой клавишей мыши, нужно сначала одним щелчком мыши выделить кнопку, а затем во вкладке «События» двойным щелчком выбрать событие мыши Click.
 После во вкладке «код» необходимо прописать, что именно будет происходить при совершении события. В этом случае мы указываем, что при событии Click будет происходить изменение цвета формы.`);
 DrawIMG(images.oop[2], ImGui.GetWindowSize().x);
 DrawIMG(images.oop[3], ImGui.GetWindowSize().x);
 ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("Стандартная библиотека элементов в PascalABC", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[2] = !oop[2];
                        });
                        if(oop[2]){
                            DrawIMG(images.oop[4], ImGui.GetWindowSize().x);
                        };
                        DrawGradientButton("PictureBox", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[3] = !oop[3];
                        });
                        if(oop[3]){
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Также на языке Pascal возможна работа с графикой. Для организации взаимодействия пользователя с графикой используется компонент PictureBox. Этот компонент является контейнером, в который помещается изображение.
Чтобы вставить картинку, нужно выбрать свойство Image компонента PictureBox и вставить картинку из файлов компьютера.`);
DrawIMG(images.oop[5], ImGui.GetWindowSize().x);
ImGui.TextWrapped(`Если нас не удовлетворяет вид вставленной картинки, то можно внести изменение в свойство SizeMode, отвечающее за способ ее отображения.\т\т `);
ImGui.BulletText("  Zoom (в случае изменения размеров контейнера будут сохраняться пропорции изображения).");
ImGui.BulletText("  AutoSize (размер контейнера будет автоматически подгоняться под размер рисунка).");
ImGui.BulletText("  Normal (левый верхний угол рисунка совмещен с левым верхним углом контейнера).");
ImGui.BulletText("  StretchImage (рисунок вписывается в контейнер).");
ImGui.BulletText("  CenterImage (рисунок будет отцентрирован относительно компонента).");
ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("Диалоговые окна и меню", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[4] = !oop[4];
                        });
                        if(oop[4]){
                            DrawIMG(images.oop[6], ImGui.GetWindowSize().x);
                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Диалоговые окна можно организовать в меню. Существует несколько типов меню:\т\т `);
ImGui.BulletText("  Главное меню с выпадающими списками разделов.");
ImGui.BulletText("  Каскадные меню, в которых разделу первичного меню ставится в соответствие список подразделов. ");
ImGui.BulletText("  Контекстные меню, появляющиеся при нажатии правой клавишей мыши на объект.\т");

ImGui.TextWrapped(` В PascalABC.Net меню создаются компонентами MenuStrip и ContextMenuStrip, расположенными на панели «Меню и панели инструментов».
Сами компоненты размещаются в специальной области под формой. На этапе выполнения программы главное меню будет помещено на стандартное место - верхнюю часть формы. Для добавления новых пунктов меню нужно кликнуть левой клавишей мыши в верхней части формы и заполнить ячейки, соответствующие пунктам меню. Каждый пункт меню является отдельным объектом, основным событием которого является Click. `);
ImGui.GetIO().FontGlobalScale = 1; 
                        };

                        DrawGradientButton("Примеры программ", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[5] = !oop[5];
                        });
                        if(oop[5]){

                            ImGui.GetIO().FontGlobalScale = 0.5;
ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
ImGui.TextWrapped(` Таким образом, грамотно используя объекты, события и имея простейшие знания в написании кода, можно писать собственные небольшие приложения.
Это может быть программа строящая диаграммы по заданым параметрам `);
DrawIMG(images.oop[7], ImGui.GetWindowSize().x);
ImGui.TextWrapped(` 
Или графический редактор
`);
DrawIMG(images.oop[8], ImGui.GetWindowSize().x);
ImGui.TextWrapped(`   
Или программу, строящую граффик функции 
`);
DrawIMG(images.oop[9], ImGui.GetWindowSize().x);
DrawButtonHREF("Исходный код графического редактора ","https://drive.google.com/drive/folders/1PukfpEYL232IHijyyKIg0wBJyiShyUk-");
DrawButtonHREF("Исходный код калькулятора ","https://drive.google.com/drive/folders/14n7UayDhFT4uc2xK76fvYeeD35VROhjc");
DrawButtonHREF("Исходный код блокнота ","https://drive.google.com/drive/folders/1QpFV0zHdfJJRUaicUebHSUbHEAxDgB9R");
ImGui.GetIO().FontGlobalScale = 1; 

                        };

                        DrawGradientButton("Теория", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[6] = !oop[6];
                        });
                        if(oop[6]){
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                            DrawButtonHREF('Объектно-ориентированное программирование',"https://ru.wikipedia.org/wiki/%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BD%D0%BE-%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5");
                            DrawButtonHREF('Объектно-событийная модель работы программы. Визуальная среда разработки программ ',"https://eior.by/catalog_lecture/11-klass/informatika/1.php");
                            DrawButtonHREF('Проектирование интерфейса оконного приложения с использованием элементов управления ',"https://eior.by/catalog_lecture/11-klass/informatika/2.php");
                            DrawButtonHREF('Элементы управления для работы с графикой  ',"https://eior.by/catalog_lecture/11-klass/informatika/3.php");
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                        };

                        DrawGradientButton("Тесты", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[7] = !oop[7];
                        });
                        if(oop[7]){
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                            DrawButtonHREF('Объектно-ориентированное программирование ',"https://docs.google.com/forms/d/e/1FAIpQLSf7BU34dbUCs3dCx3KIq-fSoB7OjbBT-MAHK9iussuC33O2hg/viewform?hr_submission=ChkIudusuooBEhAIjYSjwakMEgcI05G8raQLEAE");
                            DrawButtonHREF('Проектирование интерфейса оконного приложения с использованием элементов управления',"https://docs.google.com/forms/d/e/1FAIpQLSeBJ57VLAcZn58Y15Gl8xuu5wuwD0n9nrAtqEP2AYK-sfGPJQ/viewform?hr_submission=ChkIudusuooBEhAI97y1w6kMEgcI05G8raQLEAE");
                            ImGui.InvisibleButton("Lol", new ImGui.Vec2(100,15))
                        };

                        DrawGradientButton("Назад", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            menustate = 0;
                        });

                        ImGui.EndChild();
                        ImGui.PopStyleColor();
                    }
                   }
                   if(menustate == 5) {
                    ImGui.GetIO().FontGlobalScale = 1;
                    ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                    ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Авторы").x)*0.5+1, 26)); //ImGui.TextColored(new ImGui.Vec4(1.0, 0.0, 1.0, 1.0), "Pink");
                    ImGui.TextColored(new ImGui.Vec4(0.0, 0.0, 0.0, 1.0),"Авторы");
                    ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Авторы").x)*0.5, 25)); //ImGui.TextColored(new ImGui.Vec4(1.0, 0.0, 1.0, 1.0), "Pink");
                    if(ImGui.Text("Авторы")) menustate = 0;


                    var s1 = ImGui.GetStyle();

                    draw_list.AddRectFilled(new ImGui.Vec2(ImGui.GetWindowSize().x/5 - 30, 50 + ImGui.CalcTextSize("AWG").y), new ImGui.Vec2(ImGui.GetWindowSize().x*4 / 5 + 30, ImGui.GetWindowSize().y), ImGui.COL32(255, 255, 255, 255));
                    ImGui.SetCursorPos(new ImGui.Vec2(ImGui.GetWindowSize().x/5, 60 + ImGui.CalcTextSize("AWG").y));
                    {
                        let window_flags = ImGui.WindowFlags.None;
                        window_flags |= ImGui.WindowFlags.AlwaysVerticalScrollbar;
                        ImGui.PushStyleColor(ImGui.Col.ChildBg, ImGui.COL32(255, 255, 255, 255));
                        ImGui.PushStyleColor(ImGui.Col.Text, ImGui.COL32(0, 0, 0, 255));
                        ImGui.BeginChild("Child", new ImGui.Vec2(ImGui.GetWindowSize().x * 4/5 - ImGui.GetWindowSize().x/5, ImGui.GetWindowSize().y - 50 - ImGui.CalcTextSize("AWG").y), false, window_flags);
                        
                        ImGui.SetCursorPosX((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Шишпоренок Кирилл").x)*0.5);
                        ImGui.Text("Шишпоренок Кирилл");

                        ImGui.GetIO().FontGlobalScale = 0.5;
                        ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                        ImGui.SetCursorPosX((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Программист, редактор").x)*0.5);
                        ImGui.Text("Программист, редактор");
                        ImGui.GetIO().FontGlobalScale = 1;
                        ImGui.PopFont();


                        ImGui.SetCursorPosX((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Андрос Артём").x)*0.5);
                        ImGui.Text("Андрос Артём");

                        ImGui.GetIO().FontGlobalScale = 0.5;
                        ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                        ImGui.SetCursorPosX((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Редактор").x)*0.5);
                        ImGui.Text("Редактор");
                        ImGui.GetIO().FontGlobalScale = 1;
                        ImGui.PopFont();


                        ImGui.SetCursorPosX((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Карневич Лариса Геннадьевна").x)*0.5);
                        ImGui.Text("Карневич Лариса Геннадьевна");

                        ImGui.GetIO().FontGlobalScale = 0.5;
                        ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                        ImGui.SetCursorPosX((ImGui.GetWindowSize().x - ImGui.CalcTextSize("Руководитель проекта").x)*0.5);
                        ImGui.Text("Руководитель проекта");
                        ImGui.GetIO().FontGlobalScale = 1;
                        ImGui.PopFont();



                        DrawGradientButton("Обратная связь (необходим гугл аккаунт). Код курса - i4srvab", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            document.location.href = "https://classroom.google.com/u/2/c/Mzg3NzE2MTU1NjAz";
                        });
                        if(oop[7]){
                            
                        };

                        DrawGradientButton("Назад", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            menustate = 0;
                        });

                        ImGui.EndChild();
                        ImGui.PopStyleColor();
                    }
                   }
                   ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[2]);
                   //ImGui.GetIO().FontGlobalScale = 0.7;
                   //io.Fonts.Fonts[2];
                }
            }
            
        }
        ImGui.End();


        if (ImGui.IsKeyReleased(45)) {
            demoshown = !demoshown;
        }
        if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(ImGui.Key.Escape))) menustate = 0;
        if (!done && show_demo_window) {
            done = /*ImGui.*/ imgui_demo_js_1.ShowDemoWindow((value = show_demo_window) => show_demo_window = value);
        }
        if(demoshown){
            ImGui.Begin("Hello, world!");
            ImGui.Text("This is some useful text.");
            
            //ImGui.SetCursorPos(new ImGui.Vec2(100, 200));
            ImGui.SetCursorPosX(100);
            ImGui.Text("This is some useful text 2.");
            ImGui.Checkbox("Demo Window", (value = show_demo_window) => show_demo_window = value);
            ImGui.Checkbox("Another Window", (value = show_another_window) => show_another_window = value);
            ImGui.Checkbox("Gradient Drawable", (value = gradientstate) => gradientstate = value);
            ImGui.Checkbox("Rainbow", (value = rnb) => rnb = value);
            ImGui.SliderFloat("float", (value = f) => f = value, -300.0, 300.0);
            ImGui.SliderFloat("dxx", (value = dxx) => dxx = value, -1.0, 1.0);
            ImGui.SliderFloat("dyy", (value = dyy) => dyy = value, -300.0, 300.0);
            ImGui.SliderFloat("da", (value = da) => da = value, -1.0, 1.0);
            ImGui.ColorEdit3("clear color", clear_color);
            if (ImGui.Button("Button"))
                menustate++;
            if(menustate >=6) menustate = 0;
            ImGui.SameLine();
            ImGui.Text(`menustate = ${menustate}`);
            ImGui.Text(`Application average ${(1000.0 / ImGui.GetIO().Framerate).toFixed(3)} ms/frame (${ImGui.GetIO().Framerate.toFixed(1)} FPS)`);
            
            DrawGradientButton("test", new ImGui.Vec2(1000,100),null);
            DrawGradientButton("а на русском?", new ImGui.Vec2(1000,70),null);

            ImGui.Checkbox("Memory Editor", (value = memory_editor.Open) => memory_editor.Open = value);
            if (memory_editor.Open)
                memory_editor.DrawWindow("Memory Editor", ImGui.bind.HEAP8.buffer);
            const mi = ImGui.bind.mallinfo();
            ImGui.Text(`Max. total allocated space (usmblks):  ${mi.usmblks}`);
            ImGui.Text(`Total allocated space (uordblks):      ${mi.uordblks}`);
            ImGui.Text(`Total free space (fordblks):           ${mi.fordblks}`);
            if (ImGui.ImageButton(image_gl_texture, new ImGui.Vec2(48, 48))) {
                // show_demo_window = !show_demo_window;
                image_url = image_urls[(image_urls.indexOf(image_url) + 1) % image_urls.length];
                if (image_element) {
                    image_element.src = image_url;
                }
            }
            if (ImGui.IsItemHovered()) {
                ImGui.BeginTooltip();
                ImGui.Text(image_url);
                ImGui.EndTooltip();
            }
            if (ImGui.Button("Sandbox Window")) {
                show_sandbox_window = true;
            }
            if (show_sandbox_window)
                ShowSandboxWindow("Sandbox Window", (value = show_sandbox_window) => show_sandbox_window = value);
            ImGui.SameLine();
            if (ImGui.Button("Gamepad Window")) {
                show_gamepad_window = true;
            }
            if (show_gamepad_window)
                ShowGamepadWindow("Gamepad Window", (value = show_gamepad_window) => show_gamepad_window = value);
            ImGui.SameLine();
            if (ImGui.Button("Movie Window")) {
                show_movie_window = true;
            }
            if (show_movie_window)
                ShowMovieWindow("Movie Window", (value = show_movie_window) => show_movie_window = value);
            if (font) {
                ImGui.PushFont(font);
                ImGui.Text(`${font.GetDebugName()}`);
                if (font.FindGlyphNoFallback(0x5929)) {
                    ImGui.Text(`U+5929: \u5929`);
                }
                ImGui.PopFont();
            }
            ImGui.End();
        }

        
        // 3. Show another simple window.
        if (show_another_window) {
            ImGui.Begin("Another Window", (value = show_another_window) => show_another_window = value, ImGui.WindowFlags.AlwaysAutoResize);
            ImGui.Text("Hello from another window!");
            if (ImGui.Button("Close Me"))
                show_another_window = false;
            ImGui.End();
        }

        

        ImGui.EndFrame();
        // Rendering
        ImGui.Render();
        const gl = ImGui_Impl.gl;
        if (gl) {
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.clearColor(clear_color.x, clear_color.y, clear_color.z, clear_color.w);
            gl.clear(gl.COLOR_BUFFER_BIT);
            //gl.useProgram(0); // You may want this if using this code in an OpenGL 3+ context where shaders may be bound
        }
        const ctx = ImGui_Impl.ctx;
        if (ctx) {
            // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            //if(!gradientstate) {
                ctx.fillStyle = `rgba(${clear_color.x * 0xff}, ${clear_color.y * 0xff}, ${clear_color.z * 0xff}, ${clear_color.w})`;
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            /*}else{
                const gradient = ctx.createLinearGradient(20, 0, 220, 0);
                gradient.addColorStop(0, "green");
                gradient.addColorStop(0.5, "cyan");
                gradient.addColorStop(1, "green");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }*/
        }
        UpdateVideo();
        ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
        if (typeof (window) !== "undefined") {
            window.requestAnimationFrame(done ? _done : _loop);
        }
    }
    function _done() {
        return __awaiter(this, void 0, void 0, function* () {
            const gl = ImGui_Impl.gl;
            if (gl) {
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
                gl.clearColor(clear_color.x, clear_color.y, clear_color.z, clear_color.w);
                gl.clear(gl.COLOR_BUFFER_BIT);
            }
            const ctx = ImGui_Impl.ctx;
            if (ctx) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            CleanUpImage();
            CleanUpVideo();
            // Cleanup
            ImGui_Impl.Shutdown();
            ImGui.DestroyContext();
            console.log("Total allocated space (uordblks) @ _done:", ImGui.bind.mallinfo().uordblks);
        });
    }
    function ShowHelpMarker(desc) {
        ImGui.TextDisabled("(?)");
        if (ImGui.IsItemHovered()) {
            ImGui.BeginTooltip();
            ImGui.PushTextWrapPos(ImGui.GetFontSize() * 35.0);
            ImGui.TextUnformatted(desc);
            ImGui.PopTextWrapPos();
            ImGui.EndTooltip();
        }
    }
    function ShowSandboxWindow(title, p_open = null) {
        ImGui.SetNextWindowSize(new ImGui.Vec2(320, 240), ImGui.Cond.FirstUseEver);
        ImGui.Begin(title, p_open);
        ImGui.Text("Source");
        ImGui.SameLine();
        ShowHelpMarker("Contents evaluated and appended to the window.");
        ImGui.PushItemWidth(-1);
        ImGui.InputTextMultiline("##source", (_ = source) => (source = _), 1024, ImGui.Vec2.ZERO, ImGui.InputTextFlags.AllowTabInput);
        ImGui.PopItemWidth();
        try {
            eval(source);
        }
        catch (e) {
            ImGui.TextColored(new ImGui.Vec4(1.0, 0.0, 0.0, 1.0), "error: ");
            ImGui.SameLine();
            ImGui.Text(e.message);
        }
        ImGui.End();
    }
    function ShowGamepadWindow(title, p_open = null) {
        ImGui.Begin(title, p_open, ImGui.WindowFlags.AlwaysAutoResize);
        const gamepads = (typeof (navigator) !== "undefined" && typeof (navigator.getGamepads) === "function") ? navigator.getGamepads() : [];
        if (gamepads.length > 0) {
            for (let i = 0; i < gamepads.length; ++i) {
                const gamepad = gamepads[i];
                ImGui.Text(`gamepad ${i} ${gamepad && gamepad.id}`);
                if (!gamepad) {
                    continue;
                }
                ImGui.Text(`       `);
                for (let button = 0; button < gamepad.buttons.length; ++button) {
                    ImGui.SameLine();
                    ImGui.Text(`${button.toString(16)}`);
                }
                ImGui.Text(`buttons`);
                for (let button = 0; button < gamepad.buttons.length; ++button) {
                    ImGui.SameLine();
                    ImGui.Text(`${gamepad.buttons[button].value}`);
                }
                ImGui.Text(`axes`);
                for (let axis = 0; axis < gamepad.axes.length; ++axis) {
                    ImGui.Text(`${axis}: ${gamepad.axes[axis].toFixed(2)}`);
                }
            }
        }
        else {
            ImGui.Text("connect a gamepad");
        }
        ImGui.End();
    }
    function StartUpImage() {
        if (typeof document !== "undefined") {
            image_element = document.createElement("img");
            image_element.crossOrigin = "anonymous";
            image_element.src = image_url;
        }
        const gl = ImGui_Impl.gl;
        if (gl) {
            const width = 256;
            const height = 256;
            const pixels = new Uint8Array(4 * width * height);
            image_gl_texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, image_gl_texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            if (image_element) {
                image_element.addEventListener("load", (event) => {
                    if (image_element) {
                        gl.bindTexture(gl.TEXTURE_2D, image_gl_texture);
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image_element);
                    }
                });
            }
        }
        const ctx = ImGui_Impl.ctx;
        if (ctx) {
            image_gl_texture = image_element; // HACK
        }
    }
    function StartUpMainImage() {
        if (typeof document !== "undefined") {
            image_temp = document.createElement("img");
            image_temp.crossOrigin = "anonymous";
            image_temp.src = image_src;
        }
        const gl = ImGui_Impl.gl;
        if (gl) {
            const width = 972;
            const height = 991;
            const pixels = new Uint8Array(4 * width * height);
            image_texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, image_texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            if (image_temp) {
                image_temp.addEventListener("load", (event) => {
                    if (image_temp) {
                        gl.bindTexture(gl.TEXTURE_2D, image_texture);
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image_temp);
                    }
                });
            }
        }
        const ctx = ImGui_Impl.ctx;
        if (ctx) {
            image_texture = image_temp; // HACK
        }
    }
    function CreateTextures() {
        images.mod.forEach((e,i,a) => {
            if (typeof document !== "undefined") {
                e.temp = document.createElement("img");
                e.temp.crossOrigin = "anonymous";
                e.temp.src = e.src;
            }
            const gl = ImGui_Impl.gl;
            if (gl) {
                const width = e.size[0] + 1000;
                const height = e.size[1] + 1000;
                const pixels = new Uint8Array(4 * width * height);
                e.texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, e.texture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
                if (e.temp) {
                    e.temp.addEventListener("load", (event) => {
                        if (e.temp) {
                            gl.bindTexture(gl.TEXTURE_2D, e.texture);
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, e.temp);
                        }
                    });
                }
            }
            const ctx = ImGui_Impl.ctx;
            if (ctx) {
                e.texture = e.temp;
            }
        })
        images.web.forEach((e,i,a) => {
            if (typeof document !== "undefined") {
                e.temp = document.createElement("img");
                e.temp.crossOrigin = "anonymous";
                e.temp.src = e.src;
            }
            const gl = ImGui_Impl.gl;
            if (gl) {
                const width = e.size[0] + 1000;
                const height = e.size[1] + 1000;
                const pixels = new Uint8Array(4 * width * height);
                e.texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, e.texture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
                if (e.temp) {
                    e.temp.addEventListener("load", (event) => {
                        if (e.temp) {
                            gl.bindTexture(gl.TEXTURE_2D, e.texture);
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, e.temp);
                        }
                    });
                }
            }
            const ctx = ImGui_Impl.ctx;
            if (ctx) {
                e.texture = e.temp;
            }
        })
        images.soc.forEach((e,i,a) => {
            if (typeof document !== "undefined") {
                e.temp = document.createElement("img");
                e.temp.crossOrigin = "anonymous";
                e.temp.src = e.src;
            }
            const gl = ImGui_Impl.gl;
            if (gl) {
                const width = e.size[0] + 1000;
                const height = e.size[1] + 1000;
                const pixels = new Uint8Array(4 * width * height);
                e.texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, e.texture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
                if (e.temp) {
                    e.temp.addEventListener("load", (event) => {
                        if (e.temp) {
                            gl.bindTexture(gl.TEXTURE_2D, e.texture);
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, e.temp);
                        }
                    });
                }
            }
            const ctx = ImGui_Impl.ctx;
            if (ctx) {
                e.texture = e.temp;
            }
        })
        images.oop.forEach((e,i,a) => {
            if (typeof document !== "undefined") {
                e.temp = document.createElement("img");
                e.temp.crossOrigin = "anonymous";
                e.temp.src = e.src;
            }
            const gl = ImGui_Impl.gl;
            if (gl) {
                const width = e.size[0] + 1000;
                const height = e.size[1] + 1000;
                const pixels = new Uint8Array(4 * width * height);
                e.texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, e.texture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
                if (e.temp) {
                    e.temp.addEventListener("load", (event) => {
                        if (e.temp) {
                            gl.bindTexture(gl.TEXTURE_2D, e.texture);
                            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, e.temp);
                        }
                    });
                }
            }
            const ctx = ImGui_Impl.ctx;
            if (ctx) {
                e.texture = e.temp;
            }
        })
    }
    function CleanUpImage() {
        const gl = ImGui_Impl.gl;
        if (gl) {
            gl.deleteTexture(image_gl_texture);
            image_gl_texture = null;
            gl.deleteTexture(image_texture);
            image_texture = null;
        }
        const ctx = ImGui_Impl.ctx;
        if (ctx) {
            image_gl_texture = null;
            image_texture = null;
        }
        image_element = null;
        image_temp = null;
    }
    function StartUpVideo() {
        if (typeof document !== "undefined") {
            video_element = document.createElement("video");
            video_element.crossOrigin = "anonymous";
            video_element.preload = "auto";
            video_element.src = video_url;
            video_element.load();
        }
        const gl = ImGui_Impl.gl;
        if (gl) {
            const width = 256;
            const height = 256;
            const pixels = new Uint8Array(4 * width * height);
            video_gl_texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, video_gl_texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        }
        const ctx = ImGui_Impl.ctx;
        if (ctx) {
            video_gl_texture = video_element; // HACK
        }
    }
    function CleanUpVideo() {
        const gl = ImGui_Impl.gl;
        if (gl) {
            gl.deleteTexture(video_gl_texture);
            video_gl_texture = null;
        }
        const ctx = ImGui_Impl.ctx;
        if (ctx) {
            video_gl_texture = null;
        }
        video_element = null;
    }
    function UpdateVideo() {
        const gl = ImGui_Impl.gl;
        if (gl && video_element && video_element.readyState >= video_element.HAVE_CURRENT_DATA) {
            gl.bindTexture(gl.TEXTURE_2D, video_gl_texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video_element);
        }
    }
    function ShowMovieWindow(title, p_open = null) {
        ImGui.Begin(title, p_open, ImGui.WindowFlags.AlwaysAutoResize);
        if (video_element !== null) {
            if (p_open && !p_open()) {
                video_element.pause();
            }
            const w = video_element.videoWidth;
            const h = video_element.videoHeight;
            if (w > 0) {
                video_w = w;
            }
            if (h > 0) {
                video_h = h;
            }
            ImGui.BeginGroup();
            if (ImGui.BeginCombo("##urls", null, ImGui.ComboFlags.NoPreview | ImGui.ComboFlags.PopupAlignLeft)) {
                for (let n = 0; n < ImGui.ARRAYSIZE(video_urls); n++) {
                    if (ImGui.Selectable(video_urls[n])) {
                        video_url = video_urls[n];
                        console.log(video_url);
                        video_element.src = video_url;
                        video_element.autoplay = true;
                    }
                }
                ImGui.EndCombo();
            }
            ImGui.SameLine();
            ImGui.PushItemWidth(video_w - 20);
            if (ImGui.InputText("##url", (value = video_url) => video_url = value)) {
                console.log(video_url);
                video_element.src = video_url;
            }
            ImGui.PopItemWidth();
            ImGui.EndGroup();
            if (ImGui.ImageButton(video_gl_texture, new ImGui.Vec2(video_w, video_h))) {
                if (video_element.readyState >= video_element.HAVE_CURRENT_DATA) {
                    video_element.paused ? video_element.play() : video_element.pause();
                }
            }
            ImGui.BeginGroup();
            if (ImGui.Button(video_element.paused ? "Play" : "Stop")) {
                if (video_element.readyState >= video_element.HAVE_CURRENT_DATA) {
                    video_element.paused ? video_element.play() : video_element.pause();
                }
            }
            ImGui.SameLine();
            if (!video_time_active) {
                video_time = video_element.currentTime;
                video_duration = video_element.duration || 0;
            }
            ImGui.SliderFloat("##time", (value = video_time) => video_time = value, 0, video_duration);
            const video_time_was_active = video_time_active;
            video_time_active = ImGui.IsItemActive();
            if (!video_time_active && video_time_was_active) {
                video_element.currentTime = video_time;
            }
            ImGui.EndGroup();
        }
        else {
            ImGui.Text("No Video Element");
        }
        ImGui.End();
    }
    return {
        setters: [
            function (ImGui_1) {
                ImGui = ImGui_1;
            },
            function (ImGui_Impl_1) {
                ImGui_Impl = ImGui_Impl_1;
            },
            function (imgui_demo_js_1_1) {
                imgui_demo_js_1 = imgui_demo_js_1_1;
            },
            function (imgui_memory_editor_js_1_1) {
                imgui_memory_editor_js_1 = imgui_memory_editor_js_1_1;
            }
        ],
        execute: function () {
            font = null;
            // Our state
            show_demo_window = false;
            show_another_window = false;
            clear_color = new ImGui.Vec4(0.290, 0.945, 1, 1.00);
            memory_editor = new imgui_memory_editor_js_1.MemoryEditor();
            memory_editor.Open = false;
            show_sandbox_window = false;
            show_gamepad_window = false;
            show_movie_window = false;
            /* static */ f = 0.0;
            /* static */ counter = 0;
            done = false;
            Static = class Static {
                constructor(value) {
                    this.value = value;
                    this.access = (value = this.value) => this.value = value;
                }
            };
            source = [
                "ImGui.Text(\"Hello, world!\");",
                "ImGui.SliderFloat(\"float\",",
                "\t(value = f) => f = value,",
                "\t0.0, 1.0);",
                "",
            ].join("\n");
            image_urls = [
                "https://threejs.org/examples/textures/crate.gif",
                "https://threejs.org/examples/textures/sprite.png",
                "https://threejs.org/examples/textures/uv_grid_opengl.jpg",
            ];
            image_src = "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/bg1.png";
            image_url = image_urls[0];
            image_element = null;
            image_gl_texture = null;
            image_texture = null;
            image_temp = null;
            video_urls = [
                "https://threejs.org/examples/textures/sintel.ogv",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            ];
            video_url = video_urls[0];
            video_element = null;
            video_gl_texture = null;
            video_w = 640;
            video_h = 360;
            video_time_active = false;
            video_time = 0;
            video_duration = 0;
        }
    };
});
//# sourceMappingURL=main.js.map
