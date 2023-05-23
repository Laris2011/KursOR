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

    var Utils = {
        textSize: 0.5,
        images: [],
        createIMG: (text1,link,size) => {//текст для удобного использования
            Utils.images.push({
                text: text1,
                src: link,
                texture: null,
                temp: null,
                size: size
            });
        },
        getImage: (name) => {
            for (var i = 0; i < Utils.images.length; i++) {
                if (Utils.images[i].text === name) {
                  return Utils.images[i];
                }
              }
            return Utils.images[0];//если не найдет то выдаст первое
        },
        drawGradientButton: (module) => {
            ImGui.GetIO().FontGlobalScale = 0.3;
            let draw_list = ImGui.GetWindowDrawList();
            const gradient_size = new ImGui.Vec2(ImGui.GetWindowSize().x, 70);
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
                /*решил отказаться от кнопки, если вдруг понадобится то $чтоугодно и оно свернет
                if(module.chapter[0] == "$") {
                    ImGui.GetIO().FontGlobalScale = 0.4;
                    module.chapter = "Свернуть";
                }*/
                
                ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                if(ImGui.Button(module.chapter,gradient_size)) module.opened = !module.opened;
                ImGui.GetIO().FontGlobalScale = 1;
                ImGui.PopFont();
                ImGui.PopStyleColor(4);
            }
        },
        drawButtonHREF: (text,href) => {
            ImGui.GetStyle().ItemSpacing.y *= 2;
            ImGui.PushStyleColor(ImGui.Col.Button,ImGui.Color.HSV(187/365, 0.635, 1));
            ImGui.PushStyleColor(ImGui.Col.ButtonHovered, ImGui.Color.HSV(187/365, 0.635, 0.9));
            ImGui.PushStyleColor(ImGui.Col.ButtonActive, ImGui.Color.HSV(187/365, 0.635, 1));
            ImGui.PushStyleColor(ImGui.Col.Text, ImGui.Color.HSV(187/365, 0.635, 0.7));  
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
        },
        drawSpace: ()=>{
            ImGui.InvisibleButton("#invb", new ImGui.Vec2(100,15))
        },
        drawText: (text) => {
            ImGui.GetIO().FontGlobalScale = Utils.textSize;
            ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
            ImGui.TextWrapped(text);
            ImGui.GetIO().FontGlobalScale = 1;
        },
        drawImage: (name) => {
            let image = Utils.getImage(name);
            let ar = (ImGui.GetWindowSize().x / image.size[0]);
            let uv_min = new ImGui.Vec2(0.0, 0.0);
            let uv_max = new ImGui.Vec2(1,1);
            let tint_col = new ImGui.Vec4(1.0, 1.0, 1.0, 1.0);
            let border_col = new ImGui.Vec4(1.0, 1.0, 1.0, 0.0);
            ImGui.Image(image.texture, new ImGui.Vec2(ImGui.GetWindowSize().x - 16, image.size[1] * (ar)), uv_min, uv_max, tint_col, border_col);     
        },
        setup: () =>{
            Utils.createIMG("виды моделей",          "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%92%D0%B8%D0%B4%D1%8B%20%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B5%D0%B9.PNG",[1268,510]);
            Utils.createIMG("виды инф моделей",      "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%98%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8.PNG",[1329,628]);
            Utils.createIMG("цели",                  "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%A6%D0%B5%D0%BB%D0%B8_%D0%BA%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F.PNG",[1032,533]);
            Utils.createIMG("элемент построения",    "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%AD%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82_%D0%BF%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B4%D0%B8%D0%BD%D0%B0%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85_%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B5%D0%B9_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC.PNG",[983,536]);
            Utils.createIMG("метод монте карло",     "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%9C%D0%B5%D1%82%D0%BE%D0%B4%20%D0%9C%D0%BE%D0%BD%D1%82%D0%B5-%D0%9A%D0%B0%D1%80%D0%BB%D0%BE.PNG",[1172,531]);
            Utils.createIMG("популяции",             "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/Моделирование популяции.PNG",[1637,819]);
            Utils.createIMG("пример",                "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80.jpg",[1196,660]);
            Utils.createIMG("легенда",               "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%9B%D0%B5%D0%B3%D0%B5%D0%BD%D0%B4%D0%B0.jpg",[1200,720]);
            Utils.createIMG("выбор ист данных",      "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%92%D1%8B%D0%B1%D0%BE%D1%80%20%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B0%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85.jpg",[1200,623]);
            Utils.createIMG("изменение ряда",        "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%98%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D1%8F%D0%B4%D0%B0.jpg",[1200,696]);
            Utils.createIMG("компмод",               "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%BA%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D0%BE%D0%B5%20%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5.png",[571,425]);
            Utils.createIMG("разнообразие систем",   "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%A0%D0%B0%D0%B7%D0%BD%D0%BE%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%B8%D0%B5%20%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC.PNG",[1600,641]);
            Utils.createIMG("та самая таблица 2 XD", "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%A2%D0%B0%20%D1%81%D0%B0%D0%BC%D0%B0%D1%8F%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0%202.png",[1765,815]);
            Utils.createIMG("та самая таблица 3 XD", "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%A2%D0%B0%20%D1%81%D0%B0%D0%BC%D0%B0%D1%8F%20%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0%203.png",[1783,799]);
            Utils.createIMG("достижения",            "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%94%D0%BE%D1%81%D1%82%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B8%D0%BD%D1%84%20%D1%82%D0%B5%D1%85%D0%BD.PNG",[1396,540]);
            Utils.createIMG("черты",                 "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%A7%D0%B5%D1%80%D1%82%D1%8B%20%D0%BE%D0%B1%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%B0%20%D0%B7%D0%BD%D0%B0%D0%BD%D0%B8%D0%B9.PNG",[1359,345]);
            Utils.createIMG("работы",                "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%A1%D0%B0%D0%BC%D1%8B%D0%B5%20%D0%B2%D0%BE%D1%81%D1%82%D1%80%D0%B5%D0%B1%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%BF%D1%80%D0%BE%D1%84%D0%B5%D1%81%D1%81%D0%B8%D0%B8%20%D0%B1%D1%83%D0%B4%D1%83%D1%89%D0%B5%D0%B3%D0%BE.PNG",[926,528]);
            Utils.createIMG("этикет",                "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%9D%D0%B5%D0%BF%D1%80%D0%B8%D0%B5%D0%BC%D0%BB%D0%B8%D0%BC%D1%8B%D0%B5%20%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8F.PNG",[917,434]);
            Utils.createIMG("базовые прв эт",        "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%91%D0%B0%D0%B7%D0%BE%D0%B2%D1%8B%D0%B5%20%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0%20%D1%81%D0%B5%D1%82%D0%B5%D0%B2%D0%BE%D0%B3%D0%BE%20%D1%8D%D1%82%D0%B8%D0%BA%D0%B5%D1%82%D0%B0.PNG",[1073,646]);
            Utils.createIMG("факторы уязв",          "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%A4%D0%B0%D0%BA%D1%82%D0%BE%D1%80%D1%8B%20%D1%83%D1%8F%D0%B7%D0%B2%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B5%D0%B9.png",[835,385]);
            Utils.createIMG("меры",                  "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%9C%D0%B5%D1%80%D1%8B%20%D0%BE%D0%B1%D0%B5%D1%81%D0%BF%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BA%D0%B8%D0%B1%D0%B5%D1%80%D1%83%D1%81%D1%82%D0%BE%D0%B9%D1%87%D0%B8%D0%B2%D0%BE%D1%81%D1%82%D0%B8.PNG",[1017,672]);
            Utils.createIMG("профессии",             "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8%20%D0%BF%D0%BE%20%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%20%D0%B1%D0%B5%D0%B7.PNG",[1330,630]);
            Utils.createIMG("виды кбат",             "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%92%D0%B8%D0%B4%D1%8B%20%D0%BA%D0%B8%D0%B1%D0%B5%D1%80%D0%B0%D1%82%D0%B0%D0%BA.PNG",[1636,509]);
            Utils.createIMG("облако",                "https://raw.githubusercontent.com/HOLLYCARROT/site/e506922fcb280aa9ccbdf97d9d5237861e55e640/pages/styles/img/wordcloud.svg",[800,800]);
            Utils.createIMG("снимок",                "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA.PNG",[1219,738]);
            Utils.createIMG("графика",               "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%93%D1%80%D0%B0%D1%84%D0%B8%D0%BA%D0%B0.jpg",[1180,664]);
            Utils.createIMG("звук",                  "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%97%D0%B2%D1%83%D0%BA.jpg",[934,787]);
            Utils.createIMG("видео",                 "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%92%D0%B8%D0%B4%D0%B5%D0%BE%20%D0%BD%D0%B0%20%D0%B2%D0%B5%D0%B1-%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0%D1%85.PNG",[1330,784]);
            Utils.createIMG("совр ооп",              "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%A1%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%BE%D0%B5%20%D0%9E%D0%9E%D0%9F.PNG",[1015,473]);
            Utils.createIMG("в паск",                "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%9E%D0%9E%D0%9F%20%D0%92%20PascalABC.PNG",[1324,480]);
            Utils.createIMG("кнопка на форм",        "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%9A%D0%BD%D0%BE%D0%BF%D0%BA%D0%B0_%D0%BD%D0%B0_%D1%84%D0%BE%D1%80%D0%BC%D0%B5_%D0%9F%D0%BE%D0%B4%D1%87%D0%B5%D1%80%D0%BA%D0%BD%D1%83%D1%82%D1%8B%D0%B9_%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA_Click.PNG",[1497,803]);
            Utils.createIMG("изм цв ф",              "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%9A%D0%BD%D0%BE%D0%BF%D0%BA%D0%B0.%20%D0%98%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%86%D0%B2%D0%B5%D1%82%D0%B0%20%D1%84%D0%BE%D1%80%D0%BC%D1%8B.PNG",[754,92]);
            Utils.createIMG("станд эл упр",          "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%A1%D1%82%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%82%D0%BD%D1%8B%D0%B5%20%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D1%8B%20%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%20(2).PNG",[1349,390]);
            Utils.createIMG("форма",                 "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%A4%D0%BE%D1%80%D0%BC%D0%B0.%20PictureBox.PNG",[1496,631]);
            Utils.createIMG("комп меню",             "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%9A%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B%20%D0%BC%D0%B5%D0%BD%D1%8E%20(1).jpg",[1112,592]);
            Utils.createIMG("диаграммы",             "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%94%D0%B8%D0%B0%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D1%8B.PNG",[999,828]);
            Utils.createIMG("граф р",                "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%93%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9%20%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%BE%D1%80.PNG",[1002,721]);
            Utils.createIMG("график",                "https://raw.githubusercontent.com/3equals3/KursOR/main/imgui/misc/images/%D0%93%D1%80%D0%B0%D1%84%D0%B8%D0%BA%20%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8.PNG",[776,656]);
        }
    }
    /*
    Массив в котором последовательно расписаны разделы
    */
    var List = new Array();
    var forExample = {
        category: 6, //раздел: mod 1,soc 2,web 3,oop 4,search 5, debug 6
        chapter: "forExample.chapter",   //название
        opened: true,                   //открыт ли параграф или нет
        text: [                          //раздел с текстами, сюда записываем буквально все чтоб работал поиск
            "forExample.text[0]",//0     //так его можно получать. В идеале вместо новой строки использовать \n или если нужен большой пробел то функцию для этого
            "forExample.text[1]",//1
            "forExample.text[2]",//2
            "Открыть гугл",      //3 и так далее, так работают массивы
        ],
        draw(){                      //то что внутри каждого параграфа
            Utils.drawText(forExample.text[0]);
            Utils.drawSpace();
            Utils.drawText(forExample.text[3]);
            Utils.drawImage("виды моделей");
            Utils.drawButtonHREF(forExample.text[3],"https://google.com/");//ссылку необязательно в раздел c текстом
        }
    }
    List.push(forExample);//чтоб рендерилось.
    //Можно поступить как я и сразу запихать через push() но тогда надо иметь this. на борту
    List.push({
        category: 1,
        chapter: "Модели и формы их представления",
        opened: false,
        text: [ 
            "Модель - объект или процесс, который для различных целей рассматривается вместо другого объекта или процесса. На данный момент широко распространены компьютерные модели, представляющие собой информационную модель в виде файла на компьютерном носителе и ее изображение на экране компьютера.",
            "Создание и использование моделей для решения научных и практических задач называется моделированием."
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawText(this.text[1]);
            Utils.drawImage("виды моделей");
            Utils.drawImage("виды инф моделей");
        }
    });
    List.push({
        category: 1,
        chapter: "Цели компьютерного моделирования",
        opened: false,
        text: [],
        draw(){
            Utils.drawImage("цели");
        }
    });
    List.push({
        category: 1,
        chapter: "Современное моделирование",
        opened: false,
        text: [
            "Моделирование в научных исследованиях стало применяться еще в глубокой древности и постепенно захватывало все новые области научных знаний: техническое конструирование, строительство и архитектуру, астрономию, физику, химию, биологию и, наконец, общественные науки. Большие успехи и признание практически во всех отраслях современной науки принес методу моделирования ХХ в.\n",
            "Актуальность компьютерного моделирования состоит в том, что методами компьютерного моделирования пользуются специалисты практически всех отраслей и областей науки и техники - от истории до космонавтики, поскольку с их помощью можно прогнозировать и даже имитировать явления, события или проектируемые предметы в заранее заданных параметрах.\n",
            "В современном моделировании реализуется системных подход, состоящий в том, что моделируемый объект представляется в модели как система, т.е. совокупности объектов. Элементы системы могут быть естественными (существующие и просто выделяемые) и искусственными объектами (несуществующие условные единицы).",
            "Математическая модель системы называется динамической, если она учитывает изменение времени.\n",
            "Под компьютерным моделированием будем понимать процесс построения, изучения и применения моделей, объектов, изучаемых в технике, медицине, искусстве и других областях деятельности людей, с помощью компьютеров и компьютерных устройств.\n Стоит также отметить, что на данный момент широкое распространение получает трехмерное моделирование. Заключается оно в том, что необходимый объект представляется в виде трехмерной модели. Эта технология получила широкое распространение в современной архитектуре и 3D-печати, а также в киноиндустрии. Например, архитекторы создают компьютерные модели городов или отдельных райнов, монтажеры создают невероятные спецэффекты для фильмов, 3D-принтер на основе загруженной в него модели создает физический предмет."],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawSpace();
            Utils.drawText(this.text[1]);
            Utils.drawSpace();
            Utils.drawText(this.text[2]);
            Utils.drawSpace();
            Utils.drawText(this.text[3]);
            Utils.drawSpace();
            Utils.drawText(this.text[4]);
        }
    });
    List.push({
        category: 1,
        chapter: "Элементы построения динамических моделей систем",
        opened: false,
        text: [],
        draw(){
            Utils.drawImage("элемент построения");
        }
    });
    List.push({
        category: 1,
        chapter: "Задачи",
        opened: false,
        text: [ 
                "Биологическая задача","https://docs.google.com/presentation/d/1xZ-Kjm-IQ8J3Nc11SkRGUcynFERs9Z4W",
                'Игра в рулетку',"https://docs.google.com/presentation/d/1QE4D1X0t19VKy0leNn1Kh66YDtoI5PxV",
                "Метод Монте-Карло","https://docs.google.com/presentation/d/1lR_mByzcx767g535pgJj-cTTjQhp7KIy",
                "Выбор железнодорожной станции","https://docs.google.com/presentation/d/1xEO0_Q-2TImHJcqm01UYqeCMM7cX0Bmp",
                "Биоритмы человека","https://docs.google.com/presentation/d/1e3LIb2nT9BwySvrWJ9_ZfL3DYuYhHwK3",
                "Финансовая задача","https://docs.google.com/presentation/d/1IfwhhvGYRwGBIwpowtcrOeRWmI69y4L7",
                "Шифрование","https://docs.google.com/presentation/d/1z2ZYDpVzQn0jZfqZznnnC-UnNt07KjP0",
                "Экологическая задач","https://docs.google.com/presentation/d/16fR8neMUwvilAV9FYPehzKhXXHllRYfu",
                "Температурные режимы","https://docs.google.com/presentation/d/1-8gMTk-qHQUpjJL8CeKAVO3Dz_jIEPJy",
                "Транспортная задача","https://eior.by/catalog_lecture/11-klass/informatika/19.php",
                "Движение тела в воздухе","https://eior.by/catalog_lecture/11-klass/informatika/20.php",
                "Деление клеток","https://drive.google.com/file/d/1UKlpA24C0u4HetBHAO2nSd7dn-KkEvke/view",
                "График тренировок","https://drive.google.com/file/d/1Rr-ogxz-cplCigKf00lUXfjYSWO-pf36/view",
                "Вертикально броошенный мяч","https://drive.google.com/file/d/1BXp8Iz0jqMFsmr8T1NaPEvqhvtogY_d1/view",
                "Исследование массива температур","https://drive.google.com/file/d/1cMfC1ris91VPgUSDrxqzX-iqqIc1FInX/view",
                "Моделирование полета тела","https://drive.google.com/file/d/10j5IrGNQ9CZVboju45TpHQ5yXuUUZ4qo/view",
                "Обои и комната","https://drive.google.com/file/d/1BhWjgwZjaBbqR4qeXD9dY0bm2QpJzHVa/view",
                "Совместимость по биоритмам","https://drive.google.com/file/d/1dj7CMbou_j0Q4pWreXa8zjPUXvaswa-D/view",
                "Задача роста и убывания","https://drive.google.com/file/d/1Q_zP5g9WNrXw32K409s4Iiim-N6DZotd/view",
                "Динамика численности популяций","https://eior.by/catalog_lecture/11-klass/informatika/14.php",
        ],
        draw(){
            //xD
            this.text.forEach((e,i,a)=>{
                i%2==0?Utils.drawButtonHREF(e,a[i+1]):0;
            })
        }
    });
    List.push({
        category: 1,
        chapter: "Теория",
        opened: false,
        text: [ 
            "Компьютерное моделирование","https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D0%BE%D0%B5_%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5",
            "Компьютерное информационные модели","https://eior.by/catalog_lecture/11-klass/informatika/10.php",
            "Проектирование интерфейса оконного приложения с использованием элементов управления","https://eior.by/catalog_lecture/11-klass/informatika/2.php",
            "Моделирование случайных событий. Метод Монте-Карло","https://eior.by/catalog_lecture/11-klass/informatika/11.php",
            "Вычисление значения числа Pi методом Монте-Карло","https://eior.by/catalog_lecture/11-klass/informatika/12.php",
            "Вычисление площади фигуры методом Монте-Карло","https://eior.by/catalog_lecture/11-klass/informatika/13.php",
            "Модель «хищник-жертва»","https://eior.by/catalog_lecture/11-klass/informatika/15.php",
            "Моделирование динамики численности популяций","https://bit.ly/3NVfMK4",
            "Моделирование в задачах преследования","https://drive.google.com/file/d/1Epijn0_RtkHD3vR9J_YM6AO8xu2f_He3",
            "3D-моделирование интерьеров. Модель строительной оболочки","https://eior.by/catalog_lecture/11-klass/informatika/16.php",
            "Моделирование в экономических задачах","https://eior.by/catalog_lecture/11-klass/informatika/18.php"
        ],
        draw(){
            //вам не понять насколько я гений
            this.text.forEach((e,i,a)=>{
                i%2==0?Utils.drawButtonHREF(e,a[i+1]):0;
            }) 
        }
    });
    List.push({
        category: 1,
        chapter: "Тесты",
        opened: false,
        text: [ 
                "Компьютерные информационные модели","https://docs.google.com/forms/d/e/1FAIpQLSf0ffQ7AQ_E_exh3ujpR4RCegtc5wEdr9wM6a8vFGoOPP_Zgw/viewform",
                "Проектирование интерфейса оконного приложения с использованием элементов управления","https://docs.google.com/forms/d/e/1FAIpQLSeBJ57VLAcZn58Y15Gl8xuu5wuwD0n9nrAtqEP2AYK-sfGPJQ/viewform",
                "Моделирование случайных событий. Метод Монте-Карло","https://docs.google.com/forms/d/e/1FAIpQLSdLhAfy4umZ-D4CtJae8uDuN-EwcGrEWgFWDDPqoosjTOhz9A/viewform",
                "Вычисление значения числа pi методом Монте-Карло","https://docs.google.com/forms/d/e/1FAIpQLSczVHhPz0FYuM5if1HYrs3qZFX_N-gWG-Gm36YPFoGa_b1_IA/viewform",
                "Вычисление площади фигуры методом Монте-Карло","https://docs.google.com/forms/d/e/1FAIpQLSdtcaHJhO27LcuenfDtrG1iAfEzrpvI5GxJjNm2cu8eaR0wHw/viewform",
                "Моделирование динамики численности популяций","https://docs.google.com/forms/d/e/1FAIpQLScKMCGDugu8TQcZGciILpkXYX450Jg3KdvRS26K1LaIhp3zGw/viewform",
                "Модель строительной оболочки","https://docs.google.com/forms/d/e/1FAIpQLSc3ZieHDONwY5JDSv9e8Sbd6xxA3h7Ni_dAjBEe_CTsJplmbw/viewform",
                "Модели предметного наполнения","https://docs.google.com/forms/d/e/1FAIpQLSfNk4mhKCnK2SC1L_oIO54P9b99AFMejkI7uT5_HoczFQbzPw/viewform",
                "Моделирование в экономических задачах","https://docs.google.com/forms/d/e/1FAIpQLSdjYIgv8QdON7STIU2ydsJ9P4Xl1_IeeLCAFio5dd0SPPUXpQ/viewform",
                "Транспортная задача","https://docs.google.com/forms/d/e/1FAIpQLSe6dIJ05epdQ23KHLAYe9dJa2LpnEDvDIx4t7rNniDCgB6ySw/viewform",
                "Моделирование движения тела в воздухе","https://docs.google.com/forms/d/e/1FAIpQLSeLMqTMA5qbZoX4nojitCa2D3foThMt1v24whO2QolYmtGW1g/viewform",
        ],
        draw(){
            //я уже говорил, что я гений?
            this.text.forEach((e,i,a)=>{
                i%2==0?Utils.drawButtonHREF(e,a[i+1]):0;
            })
        }
    });

    List.push({
        category: 2,
        chapter: "Информационные системы, технологии",
        opened: false,
        text: [ 
            "Реальные объекты и явления, наблюдаемые нами в мире, очень сложные, поэтому их принято рассматривать в виде системы. Система состоит из нескольких элементов, каждый выполняет свою функцию. Для лучшего понимания темы предлагаем рассмотреть следующую таблицу с примерами:"
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawImage("разнообразие систем");
        }
    });
    List.push({
        category: 2,
        chapter: "Информационная система",
        opened: false,
        text: [ 
            "В современном обществе широко распространено такое явление, как информационная система. Информационная система - это система, элементами которой являются данные, технические средства, специалисты, а связи образуются благодаря потокам информационных процессов.",
            "Современные информационные системы являются автоматизированными, вот некоторые примеры:"
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawSpace();
            Utils.drawText(this.text[1]);
            Utils.drawImage("та самая таблица 2 XD");
        }
    });
    List.push({
        category: 2,
        chapter: "Информационные технологии в обществе",
        opened: false,
        text: [ 
            "Информационная технология - совокупность способов, приемов и методов сбора, обработки и передачи данных. Такие технологии применяются во всех областях человеческой деятельности, а их инструментами являются аппаратное, программное и математическое обеспечение. Технологический процесс разбивают на этапы. Каждый этап состоит из операций и действий, приводящих к получению пользователем того, что он ожидает получить.",
            "Для того чтобы использовать информационные технологии грамотно, нам необходимо узнать их классификацию из специальной таблицы ниже:"
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawSpace();
            Utils.drawText(this.text[1]);
            Utils.drawImage("та самая таблица 3 XD");
        }
    });
    List.push({
        category: 2,
        chapter: "Информатизация общества",
        opened: false,
        text: [ 
            "Основой информационного общества является широкое использование информационных технологий во всех сферах деятельности человека. Такое общество отличается от индустриального высоким развитием информатики.",
            "Информатизация - организационный социально-экономический и научно-технический процесс создания оптимальных условий для удовлетворения информационных потребностей людей.",
            "Важным в информатизации является наличие информационной культуры - совокупности знаний и умений человека, представленной в виде правил его поведения в информационном обществе.",
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawSpace();
            Utils.drawText(this.text[1]);
            Utils.drawSpace();
            Utils.drawText(this.text[2]);
        }
    });
    List.push({
        category: 2,
        chapter: "Виртуальная реальность",
        opened: false,
        text: [ 
            "Неотъемлемой частью современного мира становятся технологии виртуальной и дополненной реальности.",
            "Виртуальная реальность - созданный техническими средствами мир, передаваемый человеку через его ощущения. Для погружения в неё используйте шлемы, очки или комнаты виртуальной реальности.",
            "Дополненная реальность - технологии, которые дополняют реальный мир, добавляя любые сенсорные данные. Чтобы испытать такое на себе, достаточно обзавестись очками или шлемом дополненной реальности, можно также использовать смартфон или планшет.",
            "Сфера применения таких технологий достаточно широка - им находят применение в медицине, образовании, инженерии и сфере развлечений.",
            "Новейшие достижения этих технологий указаны ниже: "
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawSpace();
            Utils.drawText(this.text[1]);
            Utils.drawSpace();
            Utils.drawText(this.text[2]);
            Utils.drawSpace();
            Utils.drawText(this.text[3]);
            Utils.drawSpace();
            Utils.drawText(this.text[4]);
            Utils.drawImage("достижения");
        }
    });
    List.push({
        category: 2,
        chapter: "Образование и профессиональная деятельность в информационном обществе",
        opened: false,
        text: [ 
            "В современном мире ключевое значение имеют знания. Для обозначения этого феномена используется термин «общество знаний». Его характерные черты указаны в таблице:",
            "В «обществе знаний» инофрмационные технологии являются средством получения и усваивания новой информации.",
            "На основе владения информацией о самых различных процессах и явлениях можно эффективно и оптимально строить любую деятельность. При этом повышается не только качество потребления, но и качество производства: человек, использующий информационные технологии, имеет лучшие условия труда. Основным критерием развитости информационного общества можно считать количество населения, занятого в информационной сфере и использующего информационные и коммуникационные технологии в своей повседневной деятельности. В настоящее время достаточно много интернет-ресурсов предлагают обзоры профессий, которые будут актуальными в ближайшее время. Примеры таких должностей указаны ниже: "
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawImage("черты");
            Utils.drawText(this.text[1]);
            Utils.drawSpace();
            Utils.drawText(this.text[2]);
            Utils.drawImage("работы");
        }
    });
    List.push({
        category: 2,
        chapter: "Сетевой этикет",
        opened: false,
        text: [ 
            "Сетевой этикет - это система правил, созданная людьми для общения друг с другом в сети Интернет. Этикет общения в Интернете рекомендуется соблюдать новичкам и опытным пользователям для комфорта. Однозначно сказать, что такое сетевой этикет невозможно, но в большинстве случаев это правила хорошего тона, общепринятые среди людей.",
            "Соблюдение правил хорошего тона повышает авторитет собеседника и привлекает внимание.",
            "Чтобы ответить на вопрос, как общаться в Интернете, следует узнать, что не рекомендуется делать. Сетевой этикет подразумевает отказ от следующих действий: ",
            "Вместо всего вышеперечисленного, лучше показать себя культурным и приличным человеком, придерживаясь базовых правил сетевого этикета:"
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawSpace();
            Utils.drawText(this.text[1]);
            Utils.drawSpace();
            Utils.drawText(this.text[2]);
            Utils.drawImage("этикет");
            Utils.drawText(this.text[3]);
            Utils.drawImage("базовые прв эт");
        }
    });
    List.push({
        category: 2,
        chapter: "Кибербезопасность",
        opened: false,
        text: [ 
            "В современном информационном обществе самым важным ресурсом являются данные. Их утечка или утеря могут создать много трудностей как рядовым пользователям, так и крупным компаниям. Именно поэтому так важно задумываться о безопасности и сохранности своих данных в сети.",
            "Кибербезопасность - это состояние защищенности информационной инфраструктуры и содержащейся в ней информации от внешних и внутренних угроз.",
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawSpace();
            Utils.drawText(this.text[1]);
        }
    });
    List.push({
        category: 2,
        chapter: "Уязвимости",
        opened: false,
        text: [ 
            "Уязвимость - свойство информационной инфраструктуры или её объектов, которое позволяет реализовать угрозу. Факторы уязвимостей приведены ниже:",
            "Таким образом, происходит переход в состояние киберустойчивости - способности информационной инфраструктуры успешно и предотвращать реализацию угроз, и быстро восстанавливаться.",
            "Для обеспечения киберустойчивости необходимо принять следующие меры:",
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawImage("факторы уязв");
            Utils.drawText(this.text[1]);
            Utils.drawSpace();
            Utils.drawText(this.text[2]);
            Utils.drawImage("меры");
        }
    });
    List.push({
        category: 2,
        chapter: "Профессии, связанные с кибербезопасностью",
        opened: false,
        text: [ 
            "Информационная безопасность - одно из самых перспективных направлений в сфере ИТ. Профессионалы в области кибербезопасности защищают компании от утечек данных и прочих угроз. Ниже представлены некоторые основные специализации:"
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawImage("профессии");
        }
    });
    List.push({
        category: 2,
        chapter: "Кибератаки",
        opened: false,
        text: [ 
            "Кибератака - умышленное воздействие на информационную структуру с помощью программ."
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawImage("виды кбат");
        }
    });
    List.push({
        category: 2,
        chapter: "Киберустойчивость",
        opened: false,
        text: [ 
            "Кибербезопасность требует грамотного обеспечения: наличия системы мер защиты информационной инфраструктуры и противодействия угрозам информационной безопасности.",
            "Таким образом происходит переход в состояние киберустойчивости - способности информационной инфраструктуры успешно предотвращать реализацию угроз или быстро восстанавливаться после их реализации.",
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawSpace();
            Utils.drawText(this.text[1]);
        }
    });
    List.push({
        category: 2,
        chapter: "Теория",
        opened: false,
        text: [ 
                "Информационные системы и технологии","https://drive.google.com/file/d/1IufwBqpSopSOLmnk5BxXj7tIiSVD_4N2",
                'Кибербезопасность - это взаимодействие людей',"https://drive.google.com/file/d/1-Myd6mQLEEoDdFhMbmk13fe4pvbvYnr-",
                'Технологии будущего',"https://drive.google.com/file/d/1baXO9NqszIi3lVy6uhNEFsQF3axi9sQS",
                'Жертвы компьютерного мошенничества',"https://drive.google.com/file/d/1K0TVaIMKXgINJmEwYeIfHWF_IbqCwLIg",
                'Законодательство РБ в области Кибербезопасности',"https://drive.google.com/file/d/1shlp8fN6YE2PNV1LD4rYcJjoWbV-frdv",
                'Как обезопасить себя',"https://drive.google.com/file/d/1-CnX33qoADJgOkhcD1luvBrwj9Abi9oU",
                'Как справляться с грубостью',"https://drive.google.com/file/d/12Z1ofXU-YVeyKlpU0hNBL3hZvQNxa0_u",
                'Интернет-безопасность детей',"https://drive.google.com/file/d/1OPklRcs3dWdmE9bwUysiX_oCf14Fkp7y",
                'Глоссарий',"https://drive.google.com/file/d/1J6fCrQpCky4ALH5Yt1hQN29FTok9XaOd",
                'Кибербезопасность и киберустойчивость',"https://docs.google.com/presentation/d/1I5RlpXqw4_v1mT2BkQZpsZhGEBIBfgJH",
                'Информатизация общества и образование',"https://docs.google.com/presentation/d/1SnbABvjVpWTg6s-q1KmTyyNg7DDTpelM",
                'Информационные системы, технологии и ресурсы',"https://docs.google.com/presentation/d/1_pUspOgvGJpa-X7GaKf4KYdR_kI-3PCu"
        ],
        draw(){
            //да да я гений
            this.text.forEach((e,i,a)=>{
                i%2==0?Utils.drawButtonHREF(e,a[i+1]):0;
            }) 
        }
    });
    List.push({
        category: 2,
        chapter: "Тесты",
        opened: false,
        text: [ 
                "Безопасность в сети Интернет","https://docs.google.com/forms/d/e/1FAIpQLSft0zf_ca1F2lwglCmh-GW8KQfv8e49VgZegJ77Ue9tus-D5g/viewform",
                "Информационные системы, технологии и ресурсы","https://docs.google.com/forms/d/e/1FAIpQLScmeF8lUhvnknH5-DX5LbgPT_j6vUiwpLLuPfGKy04125T4hA/viewform",
                "Информатизация общества. Образование и профессиональная деятельность в информационном обществе","https://docs.google.com/forms/d/e/1FAIpQLSdd5t2Hy33FJ4XZZcw9g69NnZuFGXGchZdkVoh1bGgwYttgog/viewform"
        ],
        draw(){
            //моя гениальность не имеет границ
            this.text.forEach((e,i,a)=>{
                i%2==0?Utils.drawButtonHREF(e,a[i+1]):0;
            })
        }
    });

    List.push({
        category: 3,
        chapter: "Веб-сайт",
        opened: false,
        text: [ 
            "Веб-сайт представляет собой группу веб-страниц, связанных между собой гиперссылками. Существует четыре основных типа веб-сайтов:",
            "Презентационные - реклама и продвижение определенных услуг и акций.",
            "Корпоративные - представляют компанию или предприятие.",
            "Онлайн-сервисы - направлены на повседневные нужды.",
            "Электронные магазины - созданы для получения прибыли от продажи товаров.",
            "По технологии создания сайты делят на статические (информация хранится на сервере и отображается в браузере в одном и том же виде) и динамические (частично, а то и полностью генерируются в браузере или на сервере в процессе исполнения запроса пользователя).",
            "Также сайты разделяют в зависимости от типа взаимодействия с пользователем. Бывают пассивные сайты (информацию на них можно только просматривать) и интерактивные (предусмотрена возможность обмена данными с сервером).",
            "Все веб-страницы являются гипертекстовыми документами. Язык HTML (HyperText Markup Language) является одним из самых распространенных языков создания веб-сайтов. На этом языке задаются параметры и структура веб-страниц. Документы, написанные на языке HTML, имеют расширение .html. Основные компоненты этого языка - теги и атрибуты.",
            "Теги - набор специальных символов языка HTML, которые идентифицируют html-документ, задают параметры страницы, определяют разделы и положение элементов на ней.",
            "<html> - идентифицирует код html-документ, в него входят контейнеры <head> и <body>.",
            "<head> - содержит название документа, теги для поисковых машин. Эти данные не будут отображаться на исходной веб-странице.",
            "<body> - контейнер, который содержит отображающуюся на странице информацию.",
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawSpace();
            for(let i = 1;i<5;i++){
                ImGui.BulletText("  " + this.text[i]);//редкий случай когда используется. Поэтому не делал в Utils
            }
            Utils.drawText(this.text[5]);
            Utils.drawSpace();
            Utils.drawText(this.text[6]);
            Utils.drawSpace();
            Utils.drawText(this.text[7]);
            Utils.drawSpace();
            Utils.drawText(this.text[8]);
            Utils.drawSpace();
            for(let i = 9;i<12;i++){
                ImGui.BulletText("  " + this.text[i]);
            }
            Utils.drawImage("облако");
        }
    });
    List.push({
        category: 3,
        chapter: "Создание веб-страниц",
        opened: false,
        text: [ 
            "Важно понимать, что для создания веб-сайта важно не столько знание самого языка программирования, сколько излагающейся на сайте темы. Чтобы создать свой веб-сайт, достаточно воспользоватьмся протстым блокнотом, который есть на каждом компьютере, или другим текстовым редактором, или специальной программой для написания html-кода, или визуальным веб-редактором, или специальным конструктором сайтов. В случае с двумя последними создание веб-страниц окажется даже легче, ведь для работы с ними в принципе нет необходимости знать языка HTML. При работе с текстовым редактором документ нужно сохранять с расширением .html.",
            "Любая веб-страница содержит следующие элементы",
            "Заголовок (часто - логотип)",
            "Основная часть (размещение контента)",
            "Элементы навигации (например, меню)",
            "Нижний колонтитул (размещение информации о разработчике или контактных данных)",
            "Боковые панели (размещение ссылок, рекламы и т.д)",
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawSpace();
            Utils.drawText(this.text[1]);
            Utils.drawSpace();
            for(let i = 2;i<=6;i++){
                ImGui.BulletText("  " + this.text[i]);
            }
        }
    });
    List.push({
        category: 3,
        chapter: "Каскадные таблицы стилей",
        opened: false,
        text: [ 
            "CSS (Cascading Style Sheets) - формальный язык описания внешнего вида документа. CSS дополняет возможности HTML.",
            "Вынесение стилей документа в отдельный файл значительно упрощает создание веб-сайтов, поскольку отпадает необходимость отдельно прописывать параметры для каждого элемента веб-страницы.",
            "Способы подключения CSS к документу:",
            "Встроенные стили - непосредственно в открывающем теге.",
            "Таблицы стилей - стилевое описание для всех идентичных элементов. Задаются тегом <style>.",
            "Внешние таблицы стилей - отдельные файлы с расширением .css, которые содержат стилевые правила."
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawSpace();
            Utils.drawText(this.text[1]);
            Utils.drawSpace();
            Utils.drawText(this.text[2]);
            Utils.drawSpace();
            for(let i = 3;i<=5;i++){
                ImGui.BulletText("  " + this.text[i]);
            }
            Utils.drawImage("снимок");
        }
    });
    List.push({
        category: 3,
        chapter: "Графика на веб-страницах",
        opened: false,
        draw(){
            Utils.drawImage("графика");
        }
    });
    List.push({
        category: 3,
        chapter: "Звук на веб-страницах",
        opened: false,
        draw(){
            Utils.drawImage("звук");
        }
    });
    List.push({
        category: 3,
        chapter: "Видео на веб-страницах",
        opened: false,
        draw(){
            Utils.drawImage("видео");
        }
    });
    List.push({
        category: 3,
        chapter: "Этапы создания веб-сайта",
        opened: false,
        text: [ 
            "Создание веб-сайта - это не только написание кода. Это процесс, включающий в себя следующие основные этапы.",
            "Проектирование (поставить цели и задачи сайта).",
            "Разработка структуры (грамотно распределить информацию по веб-страницам).",
            "Создание дизайна (продумать графическую составляющую, цветовую палитру сайта).",
            "Создание мультимедиа-компонентов (создать графическую и звуковую составляющую, видео).",
            "Верстка страниц и шаблонов (создать html-код).",
            "Программирование (при создании сложного многофункционального сайта).",
            "Наполнение контентом.",
            "Тестирование и внесение корректировок.",
            "Публикация сайта на хостинге.",
            "Дальнейшее обслуживание.",
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawSpace();
            for(let i = 1;i<=10;i++){
                ImGui.BulletText("  " + this.text[i]);
            }
        }
    });
    List.push({
        category: 3,
        chapter: "Теория",
        opened: false,
        text: [ 
                "Информационные системы и технологии","https://drive.google.com/file/d/1IufwBqpSopSOLmnk5BxXj7tIiSVD_4N2",
                'Основы веб-конструирования',"https://eior.by/catalog_lecture/11-klass/informatika/5.php",
                'Создание веб-страниц',"https://eior.by/catalog_lecture/11-klass/informatika/6.php",
                'Рефлексия урока',"https://drive.google.com/file/d/1VHuRNjjrJQ0-FZwIOmmHJ46zNZz-FGIx",
                'Понятие о каскадных таблицах стилей',"https://eior.by/catalog_lecture/11-klass/informatika/7.php",
                'Визуальное веб-конструирование',"https://eior.by/catalog_lecture/11-klass/informatika/9.php",
                'Презентация по каскадным таблицам стилей',"https://drive.google.com/file/d/1sJPRTesd655-3L1tFxOAwPAjh9__wmgk/view",
                'Визуальное веб-конструирование',"https://eior.by/catalog_lecture/11-klass/informatika/9.php",
                'Взаимосвязь веб-программирования, веб-разработки и веб-технологий',"https://drive.google.com/file/d/1kTzi87pLt6t5DorDukwRBRz7-piqJ-ng"
        ],
        draw(){
            //ыыыыыыыыыыыыыы
            this.text.forEach((e,i,a)=>{
                i%2==0?Utils.drawButtonHREF(e,a[i+1]):0;
            }) 
        }
    });
    List.push({
        category: 3,
        chapter: "Тесты",
        opened: false,
        text: [ 
            'Основные понятия',"https://docs.google.com/forms/d/e/1FAIpQLScePAZBecVAkamQxLG7TR19FlFgpW6gGXiDA7slii3rLtmw-A/viewform",
            'Основы веб-конструирования',"https://docs.google.com/forms/d/e/1FAIpQLSfRCyPfSKewAYtlG4DTo1FMfZbJ_uLrr7IA_i3OmDozTHSK6A/viewform",
            'Создание веб-страниц',"https://docs.google.com/forms/d/e/1FAIpQLSdxIBpix5-EDnMH9OfGyPwqJBZv0B73WGsa0ZLkre3yiPgJcw/viewform",
            'Вопросы по созданию веб-страниц',"https://drive.google.com/file/d/1lZvriE1KrmQeFLzNFWhNhbwPV8HtBKc_/view",
            'Понятие о каскадных таблицах стилей',"https://docs.google.com/forms/d/e/1FAIpQLSe_VEuPDF51ajWxmLwGeGJhHvp8JvLSYf7Rd0mXosYqoR-VRA/viewform?hr_submission=ChkI78m4ooMQEhAIxZn3l8sMEgcI05G8raQLEAE",
            'Визуальное веб-конструирование',"https://docs.google.com/forms/d/e/1FAIpQLSdOQsFwueu893eiDntPn3AHc6BVUOxiqAyLafo7-D28D2C8Ww/viewform?hr_submission=ChkI78m4ooMQEhAIvr_eu8cMEgcI05G8raQLEAA",
            'Мультимедиа на веб-страницах',"https://docs.google.com/forms/d/e/1FAIpQLSd_rCOkcA8b_STHTw7jF3g6qrT7l41lex2ypT3zjb7nWap4zw/viewform?hr_submission=ChkI78m4ooMQEhAI6KKjx-UMEgcI05G8raQLEAE",
            'Визуальное веб-конструирование',"https://docs.google.com/forms/d/e/1FAIpQLSdOQsFwueu893eiDntPn3AHc6BVUOxiqAyLafo7-D28D2C8Ww/viewform?hr_submission=ChkI78m4ooMQEhAIvr_eu8cMEgcI05G8raQLEAA",
        ],
        draw(){
            //КТО ТУТ ГЕНИЙ???
            this.text.forEach((e,i,a)=>{
                i%2==0?Utils.drawButtonHREF(e,a[i+1]):0;
            })
        }
    });

    List.push({
        category: 4,
        chapter: "ООП",
        opened: false,
        text: [ 
            "Объектно-ориентированное программирование (ООП) - технология создания программ, в основе которой лежит использование объектов, являющихся экземпляром определенного класса, и методов, характеризующих их поведение."
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawImage("совр ооп");
        }
    });
    List.push({
        category: 4,
        chapter: "ООП в Pascal",
        opened: false,
        text: [ 
            "Рассмотрим ООП на примере PascalABC.",
            "Разместим на форме кнопку. Чтобы создать обработчик события для нажатия на кнопку левой клавишей мыши, нужно сначала одним щелчком мыши выделить кнопку, а затем во вкладке «События» двойным щелчком выбрать событие мыши Click.",
            "После во вкладке «код» необходимо прописать, что именно будет происходить при совершении события. В этом случае мы указываем, что при событии Click будет происходить изменение цвета формы."
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawImage("в паск");
            Utils.drawText(this.text[1]);
            Utils.drawSpace();
            Utils.drawText(this.text[2]);
            Utils.drawImage("кнопка на форм");
            Utils.drawImage("изм цв ф");
        }
    });
    List.push({
        category: 4,
        chapter: "Стандартная библиотека элементов в PascalABC",
        opened: false,
        draw(){
            Utils.drawImage("станд эл упр");
        }
    });
    List.push({
        category: 4,
        chapter: "PictureBox",
        opened: false,
        text: [ 
            "Также на языке Pascal возможна работа с графикой. Для организации взаимодействия пользователя с графикой используется компонент PictureBox. Этот компонент является контейнером, в который помещается изображение.",
            "Чтобы вставить картинку, нужно выбрать свойство Image компонента PictureBox и вставить картинку из файлов компьютера.",
            "Если нас не удовлетворяет вид вставленной картинки, то можно внести изменение в свойство SizeMode, отвечающее за способ ее отображения.",
            "Zoom (в случае изменения размеров контейнера будут сохраняться пропорции изображения).",
            "AutoSize (размер контейнера будет автоматически подгоняться под размер рисунка).",
            "Normal (левый верхний угол рисунка совмещен с левым верхним углом контейнера).",
            "StretchImage (рисунок вписывается в контейнер).",
            "CenterImage (рисунок будет отцентрирован относительно компонента)."
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawSpace();
            Utils.drawText(this.text[1]);
            Utils.drawImage("форма");
            Utils.drawText(this.text[2]);
            Utils.drawSpace();
            for(let i = 3;i<=7;i++){
                ImGui.BulletText("  " + this.text[i]);
            }
        }
    });
    List.push({
        category: 4,
        chapter: "Диалоговые окна и меню",
        opened: false,
        text: [ 
            "Диалоговые окна можно организовать в меню. Существует несколько типов меню",
            "Главное меню с выпадающими списками разделов.",
            "Каскадные меню, в которых разделу первичного меню ставится в соответствие список подразделов.",
            "Контекстные меню, появляющиеся при нажатии правой клавишей мыши на объект.",
            "В PascalABC.Net меню создаются компонентами MenuStrip и ContextMenuStrip, расположенными на панели «Меню и панели инструментов».",
            "Сами компоненты размещаются в специальной области под формой. На этапе выполнения программы главное меню будет помещено на стандартное место - верхнюю часть формы. Для добавления новых пунктов меню нужно кликнуть левой клавишей мыши в верхней части формы и заполнить ячейки, соответствующие пунктам меню. Каждый пункт меню является отдельным объектом, основным событием которого является Click."
        ],
        draw(){
            Utils.drawImage("комп меню");
            Utils.drawText(this.text[0]);
            Utils.drawSpace();
            for(let i = 1;i<=3;i++){
                ImGui.BulletText("  " + this.text[i]);
            }
            Utils.drawText(this.text[4]);
            Utils.drawText(this.text[5]);
        }
    });
    List.push({
        category: 4,
        chapter: "Примеры программ",
        opened: false,
        text: [ 
            "Таким образом, грамотно используя объекты, события и имея простейшие знания в написании кода, можно писать собственные небольшие приложения.",
            "Это может быть программа строящая диаграммы по заданым параметрам",
            "Или графический редактор",
            "Или программу, строящую граффик функции",
            "Исходный код графического редактора",
            "Исходный код калькулятора",
            "Исходный код блокнота"
        ],
        draw(){
            Utils.drawText(this.text[0]);
            Utils.drawSpace();
            Utils.drawText(this.text[1]);
            Utils.drawImage("диаграммы");
            Utils.drawSpace();
            Utils.drawText(this.text[2]);
            Utils.drawSpace();
            Utils.drawImage("граф р");
            Utils.drawSpace();
            Utils.drawText(this.text[3]);
            Utils.drawSpace();
            Utils.drawImage("график");
            //ну тут уже просто :)
            Utils.drawButtonHREF(this.text[4],"https://drive.google.com/drive/folders/1PukfpEYL232IHijyyKIg0wBJyiShyUk-");
            Utils.drawButtonHREF(this.text[5],"https://drive.google.com/drive/folders/14n7UayDhFT4uc2xK76fvYeeD35VROhjc");
            Utils.drawButtonHREF(this.text[6],"https://drive.google.com/drive/folders/1QpFV0zHdfJJRUaicUebHSUbHEAxDgB9R");
        }
    });
    List.push({
        category: 4,
        chapter: "Теория",
        opened: false,
        text: [ 
            'Объектно-ориентированное программирование',"https://ru.wikipedia.org/wiki/%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BD%D0%BE-%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5",
            'Объектно-событийная модель работы программы. Визуальная среда разработки программ ',"https://eior.by/catalog_lecture/11-klass/informatika/1.php",
            'Проектирование интерфейса оконного приложения с использованием элементов управления ',"https://eior.by/catalog_lecture/11-klass/informatika/2.php",
            'Элементы управления для работы с графикой  ',"https://eior.by/catalog_lecture/11-klass/informatika/3.php",
            'Создание приложений  ',"https://eior.by/catalog_lecture/11-klass/informatika/4.php"
        ],
        draw(){
            //AHAHAHAHAHHAHA
            this.text.forEach((e,i,a)=>{
                i%2==0?Utils.drawButtonHREF(e,a[i+1]):0;
            }) 
        }
    });
    List.push({
        category: 4,
        chapter: "Тесты",
        opened: false,
        text: [ 
            'Объектно-ориентированное программирование ',"https://docs.google.com/forms/d/e/1FAIpQLSf7BU34dbUCs3dCx3KIq-fSoB7OjbBT-MAHK9iussuC33O2hg/viewform?hr_submission=ChkIudusuooBEhAIjYSjwakMEgcI05G8raQLEAE",
            'Проектирование интерфейса оконного приложения с использованием элементов управления',"https://docs.google.com/forms/d/e/1FAIpQLSeBJ57VLAcZn58Y15Gl8xuu5wuwD0n9nrAtqEP2AYK-sfGPJQ/viewform?hr_submission=ChkIudusuooBEhAI97y1w6kMEgcI05G8raQLEAE"
        ],
        draw(){
            //И СНОВА МОЯ ГЕНИАЛЬНОСТЬ!!!1eleven
            this.text.forEach((e,i,a)=>{
                i%2==0?Utils.drawButtonHREF(e,a[i+1]):0;
            })
        }
    });


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
            ImGui.StyleColorsDark();
            io.Fonts.AddFontDefault();
            font = yield AddFontFromFileTTF("../imgui/misc/fonts/Roboto-Medium.ttf", 16);
            font = yield AddFontFromFileTTF("../imgui/misc/fonts/Roboto-Medium.ttf", 18);
            font = yield AddFontFromFileTTF("../imgui/misc/fonts/Roboto-Medium.ttf", 20);
            font = yield AddFontFromFileTTF("../imgui/misc/fonts/Roboto-Medium.ttf", 22);
            font = yield AddFontFromFileTTF("../imgui/misc/fonts/Roboto-Medium.ttf", 24);
            font = yield AddFontFromFileTTF("../imgui/misc/fonts/Roboto-Medium.ttf", 36, null, ImGui.GetIO().Fonts.GetGlyphRangesCyrillic());
            io.FontDefault = io.Fonts.Fonts[2];
            ImGui.ASSERT(font !== null);
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

            //setup img
            Utils.setup();


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
                if(t != null || t!= "debug") t();
            };
            ImGui.GetIO().FontGlobalScale = 1;
            ImGui.PopFont();
            ImGui.PopStyleColor(4);
            
        }
    }

    var dxx = 0;
    var dyy = 0;
    var da = 0;

    
    // Main loop
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

        if(ImGui.Begin("Fullscreen window", null, window_flags)){
            if(gradientstate){
                const draw_list = ImGui.GetWindowDrawList();
                const gradient_size = viewport.WorkSize;
                {
                    const p0 = new ImGui.Vec2(0, 0);
                    const p1 = new ImGui.Vec2(p0.x + gradient_size.x, p0.y + gradient_size.y);
                    const crs = rainbow();
                    const col_a = rnb ? ImGui.GetColorU32(ImGui.COL32(255*crs.x,255*crs.y,255*crs.z,255)) : ImGui.GetColorU32(ImGui.COL32(clear_color.x* 0xff, clear_color.y* 0xff, clear_color.z* 0xff, 255));
                    const col_b = ImGui.GetColorU32(ImGui.COL32(255, 255, 255, 255));
                    draw_list.AddRectFilledMultiColor(p0, p1, col_a, col_a, col_b, col_b);
                    let aspect_ratio = new ImGui.Vec2(1/((ImGui.GetWindowSize().x) / 850), 1/((ImGui.GetWindowSize().y-99) / 866));
                    let topMostRender = "КурсОР";
                    if(menustate == 1) topMostRender = "Компьютерное моделирование";
                    if(menustate == 2) topMostRender = "Информационные технологии в обществе";
                    if(menustate == 3) topMostRender = "Основы веб-конструирования";
                    if(menustate == 4) topMostRender = "Введение в ООП";
                    if(menustate == 5) topMostRender = "Поиск";
                    if(menustate == 6) topMostRender = "topMostRender";
                    ImGui.GetIO().FontGlobalScale = 1;
                        ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                        ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize(topMostRender).x)*0.5+1, 26)); 
                        ImGui.TextColored(new ImGui.Vec4(0.0, 0.0, 0.0, 1.0),topMostRender);
                        ImGui.SetCursorPos(new ImGui.Vec2((ImGui.GetWindowSize().x - ImGui.CalcTextSize(topMostRender).x)*0.5, 25)); 
                        ImGui.Text(topMostRender);
                        if (ImGui.IsItemHovered()) {
                            style.FrameRounding = 0;
                            ImGui.PushStyleColor(ImGui.Col.Border, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.PushStyleColor(ImGui.Col.PopupBg, ImGui.GetColorU32(ImGui.COL32(clear_color.x* 0xff, clear_color.y* 0xff, clear_color.z* 0xff, 255)));
                            ImGui.PushStyleColor(ImGui.Col.Text, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.SetTooltip(menustate == 0 ? "Курс на Образование и Развитие" : topMostRender);
                            ImGui.PopStyleColor(3); //2
                        }
                    if(menustate == 0){
                        const uv_min = new ImGui.Vec2(0.0, 0.0);
                        const uv_max = new ImGui.Vec2(aspect_ratio.y, aspect_ratio.y);
                        const tint_col = new ImGui.Vec4(1.0, 1.0, 1.0, 1.0);
                        const border_col = new ImGui.Vec4(1.0, 1.0, 1.0, 0.0);
                        ImGui.SetCursorPos(new ImGui.Vec2(((ImGui.GetWindowSize().x - (850/aspect_ratio.y))*0.5+1), 100));
                        ImGui.Image(image_texture, new ImGui.Vec2(850, 866), uv_min, uv_max, tint_col, border_col);
                        //DrawIMG(image_texture, ImGui.GetWindowSize().x);
                        
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
                        if(ImGui.Button("Поиск", new ImGui.Vec2(200 / aspect_ratio.y, 200/ aspect_ratio.y))) menustate = 5;
                        ImGui.PopStyleColor(4);
                        if (ImGui.IsItemHovered()) {
                            ImGui.PushStyleColor(ImGui.Col.Border, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.PushStyleColor(ImGui.Col.PopupBg, ImGui.GetColorU32(ImGui.COL32(clear_color.x* 0xff, clear_color.y* 0xff, clear_color.z* 0xff, 255)));
                            ImGui.PushStyleColor(ImGui.Col.Text, new ImGui.Vec4(19/255,148/255,197/255,255));
                            ImGui.SetTooltip("Поиск");
                            ImGui.PopStyleColor(3); //2
                        }
                        style.FrameRounding = 0;
                        //ImGui.PopStyleColor(5);
                        ImGui.PopFont();
                    }else{
                        draw_list.AddRectFilled(new ImGui.Vec2(ImGui.GetWindowSize().x/5 - 30, 50 + ImGui.CalcTextSize("AWG").y), new ImGui.Vec2(ImGui.GetWindowSize().x*4 / 5 + 30, ImGui.GetWindowSize().y), ImGui.COL32(255, 255, 255, 255));
                        ImGui.SetCursorPos(new ImGui.Vec2(ImGui.GetWindowSize().x/5, 60 + ImGui.CalcTextSize("AWG").y));
                        {
                            let window_flags = ImGui.WindowFlags.None;
                            window_flags |= ImGui.WindowFlags.AlwaysVerticalScrollbar;
                            ImGui.PushStyleColor(ImGui.Col.Text, ImGui.COL32(0, 0, 0, 255));
                            ImGui.BeginChild("Child", new ImGui.Vec2(ImGui.GetWindowSize().x * 4/5 - ImGui.GetWindowSize().x/5, ImGui.GetWindowSize().y - 50 - ImGui.CalcTextSize("AWG").y), false, window_flags);
                            if(menustate == 5){
                                ImGui.PushStyleColor(ImGui.Col.FrameBg, ImGui.GetColorU32(ImGui.COL32(clear_color.x* 0xff, clear_color.y* 0xff, clear_color.z* 0xff, 255)));
                                ImGui.GetIO().FontGlobalScale = 0.75;
                                ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[6]);
                                const search = STATIC(UNIQUE("str0#16cfd787"), new ImGui.StringBuffer(128, ""));
                                ImGui.InputText("Строка поиска", search.value, ImGui.ARRAYSIZE(search.value));
                                ImGui.GetIO().FontGlobalScale = 1;
                                ImGui.PopStyleColor();
                                //console.log(search.value.buffer);

                                

                                List.forEach((e,index,a)=>{
                                    //if(e.chapter.includes(search.value.buffer.toString()) && search.value.buffer.toString().charAt(0) != " " && search.value.buffer.toString().length >0) Utils.drawGradientButton(e);
                                    if(e.category != 6 && e.category != 5 && search.value.buffer.charAt(0) != " " && search.value.buffer.length > 0){
                                        if(e.text != undefined){
                                            let found = false;
                                            for(var i = 0;i<e.text.length;i++){
                                                if(!e.text[i].includes("https://") && e.text[i].includes(search.value.buffer)){
                                                    found = true;
                                                }
                                            }
                                            if(found){
                                                Utils.drawGradientButton(e);
                                                if(e.opened) e.draw();
                                            }
                                        }
                                    }
                                });
                            }

                            if(menustate != 5)List.forEach((e,i,a)=>{
                                if(e.category == menustate){
                                    Utils.drawGradientButton(e);
                                    if(e.opened) e.draw();
                                }
                            });
                            DrawGradientButton("Назад", new ImGui.Vec2(ImGui.GetWindowSize().x, 70), ()=>{
                                menustate = 0;
                            });
                            ImGui.EndChild();
                            ImGui.PopStyleColor();
                        }
                   }
                   ImGui.PushFont(ImGui.GetIO().Fonts.Fonts[2]);
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
            ImGui.ColorEdit3("clear color", clear_color);
            if (ImGui.Button("Button"))
                menustate--;
            if(menustate >=7) menustate = 0;
            if(menustate <0) menustate = 6;
            ImGui.SameLine();
            ImGui.Text(`menustate = ${menustate}`);
            ImGui.Text(`Application average ${(1000.0 / ImGui.GetIO().Framerate).toFixed(3)} ms/frame (${ImGui.GetIO().Framerate.toFixed(1)} FPS)`);
            
            DrawGradientButton("test", new ImGui.Vec2(1000,100),()=>{console.log("clicked")});
            DrawGradientButton("а на русском?", new ImGui.Vec2(1000,70),()=>{console.log("clicked")});

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
        Utils.images.forEach((e,i,a) => {
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
            _static_map = new Map();
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
