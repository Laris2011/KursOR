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
        if(category == 0)
        images.mod.push({
            src: link,
            texture: null,
            temp: null,
            size: size
        });
        if(category == 1)
        images.soc.push({
            src: link,
            texture: null,
            temp: null,
            size: size
        });
        if(category == 2)
        images.web.push({
            src: link,
            texture: null,
            temp: null,
            size: size
        });
        if(category == 3)
        images.oop.push({
            src: link,
            texture: null,
            temp: null,
            size: size
        });
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

            CreateTextures();
            StartUpImage();
            StartUpMainImage();
            StartUpVideo();
            if (typeof (window) !== "undefined") {
                window.requestAnimationFrame(_loop);
            }
        });
    }

    function rainbow(){
        var rainbowState = Math.ceil(new Date().getMilliseconds()*20);
        //console.log(rainbowState);
        rainbowState %= 360;
        console.log(rainbowState);
        const r = [0];
        const g = [0];
        const b = [0];
        ImGui.ColorConvertHSVtoRGB(rainbowState, 181, 255, r, g, b);
        return new ImGui.Vec4(r[0], g[0], b[0], 1.0) //ImGui.COL32(clear_color.x* 0xff, clear_color.y* 0xff, clear_color.z* 0xff, 255)


        
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
            ImGui.GetIO().FontGlobalScale = 0.7;
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
        //let sz = ImGui.GetWindowSize().x /1.2;
        ImGui.Text("size: " + ImGui.GetWindowSize().x);
        
        /* const ar = (size / s.size[0]) + dxx;// / size; ///тут надо убрать
        ImGui.Text("ar: " + ar);
        ImGui.Text("ar^-1: " + 1/ar);
        let uv_min = new ImGui.Vec2(0.0, 0.0); // Top-left               ---resize
        const uv_max = new ImGui.Vec2(1/((ImGui.GetWindowSize().x - 40) / s.size[0]) +da,1/((ImGui.GetWindowSize().x - 40) / s.size[0])+da); // Lower-right 1.0 1.0 //а тут надо оставить как-то /при 2оно меньше в 2 раза, хз че делать
        let tint_col = new ImGui.Vec4(1.0, 1.0, 1.0, 1.0); // No tint
        let border_col = new ImGui.Vec4(0.0, 0.0, 0.0, 1.0); // 50% opaque white  a 0.5 -> 0.0
        ImGui.Image(s.texture, new ImGui.Vec2(ImGui.GetWindowSize().x - 40 + f, s.size[1]), uv_min, uv_max, tint_col, border_col); */

        const ar = (size / s.size[0]) + dxx;// / size; ///тут надо убрать
        ImGui.Text("ar: " + ar);
        ImGui.Text("ar^-1: " + 1/ar);
        let uv_min = new ImGui.Vec2(0.0, 0.0); // Top-left               ---resize
        const uv_max = new ImGui.Vec2(1 + da,1 + da); // Lower-right 1.0 1.0 //а тут надо оставить как-то /при 2оно меньше в 2 раза, хз че делать
        let tint_col = new ImGui.Vec4(1.0, 1.0, 1.0, 1.0); // No tint
        let border_col = new ImGui.Vec4(0.0, 0.0, 0.0, 1.0); // 50% opaque white  a 0.5 -> 0.0
        ImGui.Image(s.texture, new ImGui.Vec2(ImGui.GetWindowSize().x - 40 + f, s.size[1] * (ar) + dyy), uv_min, uv_max, tint_col, border_col); 
                        
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
        //style.
        //main
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
                    const col_a = rnb ? ImGui.GetColorU32(ImGui.COL32(rainbow().x,rainbow().y,rainbow().z,255)) : ImGui.GetColorU32(ImGui.COL32(clear_color.x* 0xff, clear_color.y* 0xff, clear_color.z* 0xff, 255));
                    const col_b = ImGui.GetColorU32(ImGui.COL32(255, 255, 255, 255));
                    draw_list.AddRectFilledMultiColor(p0, p1, col_a, col_a, col_b, col_b);

                    //ImGui.ImageButton(image_texture, new ImGui.Vec2(971, 991));
                    //ImGui.InvisibleButton("##gradientbg2", gradient_size);

                    //const pos = ImGui.GetCursorScreenPos();  //for tooltip, wip
                    let aspect_ratio = new ImGui.Vec2(1/((ImGui.GetWindowSize().x) / 850), 1/((ImGui.GetWindowSize().y-99) / 866));

                
                   if(menustate == 0){
                        const uv_min = new ImGui.Vec2(0.0, 0.0); // Top-left               ---resize
                        const uv_max = new ImGui.Vec2(aspect_ratio.y, aspect_ratio.y); // Lower-right 1.0 1.0
                        const tint_col = new ImGui.Vec4(1.0, 1.0, 1.0, 1.0); // No tint
                        const border_col = new ImGui.Vec4(1.0, 1.0, 1.0, 0.0); // 50% opaque white  a 0.5 -> 0.0
                        ImGui.SetCursorPos(new ImGui.Vec2(((ImGui.GetWindowSize().x - (850/aspect_ratio.y))*0.5+1), 100));//
                        ImGui.Image(image_texture, new ImGui.Vec2(850, 866), uv_min, uv_max, tint_col, border_col);

                        ImGui.GetIO().FontGlobalScale = 1;
                        ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                        ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize("КурсОР").x)*0.5+1, 26)); //ImGui.TextColored(new ImGui.Vec4(1.0, 0.0, 1.0, 1.0), "Pink");
                        ImGui.TextColored(new ImGui.Vec4(0.0, 0.0, 0.0, 1.0),"КурсОР");
                        ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize("КурсОР").x)*0.5, 25)); //ImGui.TextColored(new ImGui.Vec4(1.0, 0.0, 1.0, 1.0), "Pink");
                        ImGui.Text("КурсОР");
                        if (ImGui.IsItemHovered()) {
                            style.FrameRounding = 0;
                            ImGui.PushStyleColor(ImGui.Col.Border, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.PushStyleColor(ImGui.Col.PopupBg, ImGui.GetColorU32(ImGui.COL32(clear_color.x* 0xff, clear_color.y* 0xff, clear_color.z* 0xff, 255)));
                            ImGui.PushStyleColor(ImGui.Col.Text, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.SetTooltip("Курс на Образование и Развитие");
                            ImGui.PopStyleColor(3); //2
                        }
                        //ImGui.GetIO().FontGlobalScale = 1;
                        

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
                        window_flags |= ImGui.WindowFlags.NoBackground;
                        //ImGui.PushStyleVar(ImGui.StyleVar.ChildRounding, 5.0);
                        ImGui.PushStyleColor(ImGui.Col.ChildBg, ImGui.COL32(255, 255, 255, 255));
                        ImGui.PushStyleColor(ImGui.Col.Text, ImGui.COL32(0, 0, 0, 255));
                
                        ImGui.BeginChild("Child", new ImGui.Vec2(ImGui.GetWindowSize().x * 4/5 - ImGui.GetWindowSize().x/5, ImGui.GetWindowSize().y - 50 - ImGui.CalcTextSize("AWG").y), false, ImGui.WindowFlags.None);
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
                            
                        }
                        DrawGradientButton("Метод Монте-Карло", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            cmodels[4] = !cmodels[4];
                        });
                        if(cmodels[4]){ 

                            ImGui.GetIO().FontGlobalScale = 0.5;
                            ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                            ImGui.TextWrapped(` Метод Монте-Карло, названный в честь одного из самых знаменитых казино мира, основан на использовании генератора случайных чисел. Также значения генератора случайных чисел называют псевдослучайными числами, поскольку получены они были посредством строгих математических методов и, следовательно, они являются предсказуемыми.
\n На языке PascalABC генератор случайных чисел реализован в стандартной функции random().
 В электронных таблицах MS Excel генератор случайных чисел реализован в функциях СЛЧИС() и СЛУЧМЕЖДУ().
\n Рассмотреть метод Монте-Карло можно на примере задачи определения площади некоторой плоской фигуры.
 Пусть имеется плоская фигура, которая находится внутри прямоугольника (будем называть его базовым) с известной площадью S. Засыплем мысленно прямоугольник тончайшем слоем песка. Если подсчитать общее число песчинок n и число k тех песчинок, которые попали на фигуру, то приближенно площадь фигуры можно считать по формуле C = S * k : n, где С – площадь фигуры.
 Таким образом метод Монте-Карло освобождает нас от необходимости самим разбрасывать и подсчитывать песчинки. Рассмотрим суть метода Монте-Карло на примере задачи определения площади некоторой плоской фигуры. Это приложение метода называют геометрическим методом Монте-Карло.
 Пусть имеется плоская фигура, которая находится внутри пря¬моугольника с известной площадью S0. `);

                            ImGui.TextWrapped(` Засыплем мысленно прямоугольник тончайшим слоем песка. Прямоугольник с известной площадью в геометрическом методе Монте-Карло будем называть базовым. Если посчитать общее число n песчинок и число k тех песчинок, которые попали на фигуру, то приближенно площадь фигуры можно считать по формуле: `);
                            ImGui.GetIO().FontGlobalScale = 1;
                            
                        }
                        DrawGradientButton("Моделирование динамики численности популяций", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            cmodels[5] = !cmodels[5];
                        });
                        if(cmodels[5]){ 
                            ImGui.GetIO().FontGlobalScale = 0.5;
                            ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                            ImGui.TextWrapped(` Для описания динамики изменения численности популяций ученые используют несколько математических моделей. Для двух популяций используются модели взаимодействия двух видов. Среди них модель «хищник-жертва», модель конкуренции двух видов за ресурсы питания, модели взаимовыгодного взаимодействия (симбиоза). `);
                            ImGui.TextWrapped(`\n Затычка\n`);
ImGui.TextWrapped(` В электронных таблицах создадим комплексную компьютерную модель динамики численности четырех популяций, рассмотренных ранее.
 Для расчета численности популяции с неограниченным ростом используем формулу
  x(1) = (1 + a)x(0).
 Для популяции с ограниченным ростом используем формулу
  x(1) = x(0) + (a – bx(0))x(0).
 Для популяции с минимальной критической численностью используем формулу
  x(1) = x(0) + (a – bx(0))·(x(0) – L).
 Для популяции с критической численностью и отловом особей используем формулу
  x(1) = x(0) + (a – bx(0))·(x(0) – L) – Z.
 В исходных данных нужно задать значения параметров, записанных в правых частях этих формул.
 Данные компьютерной расчетной модели разместим по схеме примера: `);

ImGui.TextWrapped(` Вводим формулы
  A10: =A4/A5 A12: 0
 В ячейки B12:E12 вводим формулу
  =$A$3
 В следующей строке
  A13: =A12+1
 В ячейки B13:E13 нужно ввести правые части четырех расчетных формул. Значение x(0) для формулы в каждом столбце берется из предыдущей строки.
  B13: = (1 + $A$4)*B12
  C13: = C12+($A$4-$A$5*C12)*C12
  D13: =D12+($A$4—$A$5*D12)*(D12—$A$6)
  E13: =E12+($A$4—$A$5*E12)* [1]
  (E12—$A$6)—$A$7
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

ImGui.TextWrapped(` Осталось поменять имена элементов диаграммы. Щелкаем по диаграмме правой клавишей мыши и в контекстном меню выбираем пункт "Выбрать данные …". Появляется диалоговое окно "Выбор источника данных". `);
ImGui.TextWrapped(` В диалоговом окне слева выделяем строку "Ряд1" и щелкаем по кнопке "Изменить". Появляется диалоговое окно "Изменение ряда". `);
ImGui.TextWrapped(` В верхнее поле "Имя ряда" щелчком по ячейке B11 вводим ссылку на заголовок второго столбца. Нажимаем кнопку OK. Имена остальных рядов изменяем аналогично. `);
                            
                            ImGui.GetIO().FontGlobalScale = 1;
                            
                        }

                        DrawGradientButton("Teория", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            cmodels[6] = !cmodels[6];
                        });
                        if(cmodels[6]){ 
                            
                        }
                        DrawGradientButton("Тесты", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            cmodels[7] = !cmodels[7];
                        });
                        if(cmodels[7]){ 
                            
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
                        window_flags |= ImGui.WindowFlags.NoBackground;
                        ImGui.PushStyleColor(ImGui.Col.ChildBg, ImGui.COL32(255, 255, 255, 255));
                        ImGui.PushStyleColor(ImGui.Col.Text, ImGui.COL32(0, 0, 0, 255));
                        ImGui.BeginChild("Child", new ImGui.Vec2(ImGui.GetWindowSize().x * 4/5 - ImGui.GetWindowSize().x/5, ImGui.GetWindowSize().y - 50 - ImGui.CalcTextSize("AWG").y), false, ImGui.WindowFlags.None);
                        
                        
                        ImGui.GetIO().FontGlobalScale = 0.3;

                        DrawGradientButton("Информационные системы, технологии", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[0] = !itinsoc[0];
                        });
                        if(itinsoc[0]){
                            
                        };

                        DrawGradientButton("Информационная система", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[1] = !itinsoc[1];
                        });
                        if(itinsoc[1]){
                            
                        };

                        DrawGradientButton("Информационные технологии в обществе", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[2] = !itinsoc[2];
                        });
                        if(itinsoc[2]){
                            
                        };

                        DrawGradientButton("Информатизация общества", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[3] = !itinsoc[3];
                        });
                        if(itinsoc[3]){
                            
                        };

                        DrawGradientButton("Виртуальная реальность", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[4] = !itinsoc[4];
                        });
                        if(itinsoc[4]){
                            
                        };

                        DrawGradientButton("Образование и профессиональная деятельность в информационном обществе", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[5] = !itinsoc[5];
                        });
                        if(itinsoc[5]){
                            
                        };

                        DrawGradientButton("Сетевой этикет", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[6] = !itinsoc[6];
                        });
                        if(itinsoc[6]){
                            
                        };

                        DrawGradientButton("Кибербезопасность", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[7] = !itinsoc[7];
                        });
                        if(itinsoc[7]){
                            
                        };

                        DrawGradientButton("Уязвимости", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[8] = !itinsoc[8];
                        });
                        if(itinsoc[8]){
                            
                        };

                        DrawGradientButton("Профессии, связанные с кибербезопасностью", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[9] = !itinsoc[9];
                        });
                        if(itinsoc[9]){
                            
                        };

                        DrawGradientButton("Кибератаки", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[10] = !itinsoc[10];
                        });
                        if(itinsoc[10]){
                            
                        };

                        DrawGradientButton("Киберустойчивость", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[11] = !itinsoc[11];
                        });
                        if(itinsoc[11]){
                            
                        };

                        DrawGradientButton("Итог", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[12] = !itinsoc[12];
                        });
                        if(itinsoc[12]){
                            
                        };

                        DrawGradientButton("Теория", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[13] = !itinsoc[13];
                        });
                        if(itinsoc[13]){
                            
                        };

                        DrawGradientButton("Тесты", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            itinsoc[14] = !itinsoc[14];
                        });
                        if(itinsoc[14]){
                            /* DrawGradientButton("$Свернуть", new ImGui.Vec2(100, 25), ()=>{
                                itinsoc[14] = false;
                            }); */
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
                        window_flags |= ImGui.WindowFlags.NoBackground;
                        ImGui.PushStyleColor(ImGui.Col.ChildBg, ImGui.COL32(255, 255, 255, 255));
                        ImGui.PushStyleColor(ImGui.Col.Text, ImGui.COL32(0, 0, 0, 255));
                        ImGui.BeginChild("Child", new ImGui.Vec2(ImGui.GetWindowSize().x * 4/5 - ImGui.GetWindowSize().x/5, ImGui.GetWindowSize().y - 50 - ImGui.CalcTextSize("AWG").y), false, ImGui.WindowFlags.None);
                        
                        
                        ImGui.GetIO().FontGlobalScale = 0.3;

                        DrawGradientButton("Веб-сайт", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[0] = !webconstr[0];
                        });
                        if(webconstr[0]){
                            
                        };

                        DrawGradientButton("Создание веб-страниц", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[1] = !webconstr[1];
                        });
                        if(webconstr[1]){
                            
                        };

                        DrawGradientButton("Каскадные таблицы стилей", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[2] = !webconstr[2];
                        });
                        if(webconstr[2]){
                            
                        };

                        DrawGradientButton("Графика на веб-страницах", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[3] = !webconstr[3];
                        });
                        if(webconstr[3]){
                            
                        };

                        DrawGradientButton("Звук на веб-страницах", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[4] = !webconstr[4];
                        });
                        if(webconstr[4]){
                            
                        };

                        DrawGradientButton("Видео на веб-страницах", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[5] = !webconstr[5];
                        });
                        if(webconstr[5]){
                            
                        };

                        DrawGradientButton("Этапы создания веб-сайта", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[6] = !webconstr[6];
                        });
                        if(webconstr[6]){
                            
                        };

                        DrawGradientButton("Теория", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[7] = !webconstr[7];
                        });
                        if(webconstr[7]){
                            
                        };

                        DrawGradientButton("Тесты", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            webconstr[8] = !webconstr[8];
                        });
                        if(webconstr[8]){
                            
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
                        window_flags |= ImGui.WindowFlags.NoBackground;
                        ImGui.PushStyleColor(ImGui.Col.ChildBg, ImGui.COL32(255, 255, 255, 255));
                        ImGui.PushStyleColor(ImGui.Col.Text, ImGui.COL32(0, 0, 0, 255));
                        ImGui.BeginChild("Child", new ImGui.Vec2(ImGui.GetWindowSize().x * 4/5 - ImGui.GetWindowSize().x/5, ImGui.GetWindowSize().y - 50 - ImGui.CalcTextSize("AWG").y), false, ImGui.WindowFlags.None);
                        

                        DrawGradientButton("ООП", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[0] = !oop[0];
                        });
                        if(oop[0]){
                            
                        };

                        DrawGradientButton("ООП в Pascal", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[1] = !oop[1];
                        });
                        if(oop[1]){
                            
                        };

                        DrawGradientButton("Стандартная библиотека элементов в PascalABC", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[2] = !oop[2];
                        });
                        if(oop[2]){
                            
                        };

                        DrawGradientButton("PictureBox", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[3] = !oop[3];
                        });
                        if(oop[3]){
                            
                        };

                        DrawGradientButton("Диалоговые окна и меню", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[4] = !oop[4];
                        });
                        if(oop[4]){
                            
                        };

                        DrawGradientButton("Примеры программ", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[5] = !oop[5];
                        });
                        if(oop[5]){
                            
                        };

                        DrawGradientButton("Теория", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[6] = !oop[6];
                        });
                        if(oop[6]){
                            
                        };

                        DrawGradientButton("Тесты", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                            oop[7] = !oop[7];
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
                        window_flags |= ImGui.WindowFlags.NoBackground;
                        ImGui.PushStyleColor(ImGui.Col.ChildBg, ImGui.COL32(255, 255, 255, 255));
                        ImGui.PushStyleColor(ImGui.Col.Text, ImGui.COL32(0, 0, 0, 255));
                        ImGui.BeginChild("Child", new ImGui.Vec2(ImGui.GetWindowSize().x * 4/5 - ImGui.GetWindowSize().x/5, ImGui.GetWindowSize().y - 50 - ImGui.CalcTextSize("AWG").y), false, ImGui.WindowFlags.None);
                        
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
                            console.log("Обратная связь (необходим гугл аккаунт). Код курса - i4srvab");
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
