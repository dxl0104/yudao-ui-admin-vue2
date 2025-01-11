const categories = [
    {
        name: '专业沙龙设备',
        url: 'https://allegro.pl/kategoria/profesjonalne-wyposazenie-salonow-122616?miejsce-wysylki=chiny'
    },
    {name: '成人用品', url: 'https://allegro.pl/kategoria/erotyka-63757?miejsce-wysylki=chiny'},
    {name: '婴儿喂养', url: 'https://allegro.pl/kategoria/karmienie-dziecka-99333?miejsce-wysylki=chiny'},
    {name: '自然医学', url: 'https://allegro.pl/kategoria/medycyna-naturalna-258258?miejsce-wysylki=chiny'},
    {name: '工具', url: 'https://allegro.pl/kategoria/narzedzia-1536?miejsce-wysylki=chiny'},
    {name: '花园', url: 'https://allegro.pl/kategoria/ogrod-1532?miejsce-wysylki=chiny'},
    {name: '设备', url: 'https://allegro.pl/kategoria/wyposazenie-123?miejsce-wysylki=chiny'},
    {name: '建筑与配件', url: 'https://allegro.pl/kategoria/budownictwo-i-akcesoria-1520?miejsce-wysylki=chiny'},
    {name: '照明', url: 'https://allegro.pl/kategoria/oswietlenie-5317?miejsce-wysylki=chiny'},
    {name: '玩具', url: 'https://allegro.pl/kategoria/zabawki-11818?miejsce-wysylki=chiny'},
    {name: '园艺玩具', url: 'https://allegro.pl/kategoria/zabawki-ogrodowe-86273?miejsce-wysylki=chiny'},
    {name: '母婴用品', url: 'https://allegro.pl/kategoria/akcesoria-dla-mamy-i-dziecka-82595?miejsce-wysylki=chiny'},
    {name: '派对与活动', url: 'https://allegro.pl/kategoria/okazje-przyjecia-88293?miejsce-wysylki=chiny'},
    {name: '健康与卫生', url: 'https://allegro.pl/kategoria/zdrowie-i-higiena-17285?miejsce-wysylki=chiny'},
    {
        name: '儿童房 (50-100)',
        url: 'https://allegro.pl/kategoria/pokoj-dzieciecy-17272?miejsce-wysylki=chiny&price_from=50&price_to=100'
    },
    {name: '服装', url: 'https://allegro.pl/kategoria/odziez-11764?miejsce-wysylki=chiny'},
    {name: '鞋子', url: 'https://allegro.pl/kategoria/obuwie-25952?miejsce-wysylki=chiny'},
    {name: '文具', url: 'https://allegro.pl/kategoria/artykuly-szkolne-50673?miejsce-wysylki=chiny'},
    {name: '皮肤护理', url: 'https://allegro.pl/kategoria/pielegnacja-1430?miejsce-wysylki=chiny'},
    {name: '香水与香氛', url: 'https://allegro.pl/kategoria/perfumy-i-wody-135?miejsce-wysylki=chiny'},
    {name: '美甲与修脚', url: 'https://allegro.pl/kategoria/manicure-i-pedicure-45658?miejsce-wysylki=chiny'},
    {name: '化妆', url: 'https://allegro.pl/kategoria/makijaz-45657?miejsce-wysylki=chiny'},

    {name: '洗发水', url: 'https://allegro.pl/kategoria/wlosy-szampony-5363?miejsce-wysylki=chiny'},
    {name: '面霜', url: 'https://allegro.pl/kategoria/twarz-kremy-do-twarzy-258462?miejsce-wysylki=chiny'},
    {name: '家庭急救箱', url: 'https://allegro.pl/kategoria/domowa-apteczka-320263?miejsce-wysylki=chiny'},
    {name: '皮肤科护肤品', url: 'https://allegro.pl/kategoria/dermokosmetyki-258353?miejsce-wysylki=chiny'},
    {name: '口腔卫生', url: 'https://allegro.pl/kategoria/higiena-jamy-ustnej-257760?miejsce-wysylki=chiny'},
    {name: '视力矫正', url: 'https://allegro.pl/kategoria/korekcja-wzroku-122423?miejsce-wysylki=chiny'},
    {name: '个人卫生', url: 'https://allegro.pl/kategoria/higiena-osobista-318822?miejsce-wysylki=chiny'},
    {
        name: '医疗设备与用品',
        url: 'https://allegro.pl/kategoria/sprzet-i-wyposazenie-medyczne-318828?miejsce-wysylki=chiny'
    },
    {name: '书籍', url: 'https://allegro.pl/kategoria/ksiazki-7?miejsce-wysylki=chiny'},
    {name: '游戏', url: 'https://allegro.pl/kategoria/gry?miejsce-wysylki=chiny'},
    {name: '乐器', url: 'https://allegro.pl/kategoria/instrumenty?miejsce-wysylki=chiny'},
    {name: '音乐', url: 'https://allegro.pl/kategoria/muzyka?miejsce-wysylki=chiny'},
    {
        name: '自行车及配件 (0-500兹罗提)',
        url: 'https://allegro.pl/kategoria/rowery-i-akcesoria-16414?miejsce-wysylki=chiny&price_from=0&price_to=500'
    },
    {name: '旅游', url: 'https://allegro.pl/kategoria/turystyka-3922?miejsce-wysylki=pozostale-kraje-ue'},
    {name: '钓鱼', url: 'https://allegro.pl/kategoria/wedkarstwo-121722?miejsce-wysylki=chiny'},
    {name: '滑冰', url: 'https://allegro.pl/kategoria/skating-slackline-148302?miejsce-wysylki=chiny'},
    {name: '军品', url: 'https://allegro.pl/kategoria/militaria-253062?miejsce-wysylki=chiny'},
    {name: '团体运动', url: 'https://allegro.pl/kategoria/sporty-druzynowe-13368?miejsce-wysylki=chiny'},
    {name: '水上运动', url: 'https://allegro.pl/kategoria/sporty-wodne-13535?miejsce-wysylki=chiny'},
    {name: '休闲运动', url: 'https://allegro.pl/kategoria/sporty-towarzyskie-i-rekreacja-13408?miejsce-wysylki=chiny'},
    {name: '跑步', url: 'https://allegro.pl/kategoria/bieganie-147262?miejsce-wysylki=chiny'},
    {name: '武术', url: 'https://allegro.pl/kategoria/sporty-walki-13522?miejsce-wysylki=chiny'},
    {name: '网球及相关', url: 'https://allegro.pl/kategoria/tenis-i-pokrewne-13638?miejsce-wysylki=chiny'},
    {name: '极限运动', url: 'https://allegro.pl/kategoria/sporty-ekstremalne-112252?miejsce-wysylki=chiny'},
    {name: '汽车配件', url: 'https://allegro.pl/kategoria/czesci-samochodowe-620?miejsce-wysylki=chiny'},
    {
        name: '工具与车间设备',
        url: 'https://allegro.pl/kategoria/narzedzia-i-sprzet-warsztatowy-18554?miejsce-wysylki=chiny'
    },
    {
        name: '汽车配件与设备',
        url: 'https://allegro.pl/kategoria/wyposazenie-i-akcesoria-samochodowe-253498?miejsce-wysylki=chiny'
    },
    {name: '化学品', url: 'https://allegro.pl/kategoria/chemia-18903?miejsce-wysylki=chiny'},
    {
        name: '摩托车配件',
        url: 'https://allegro.pl/kategoria/czesci-i-wyposazenie-motocyklowe-156?miejsce-wysylki=chiny'
    },
    {
        name: '机器与其他车辆配件',
        url: 'https://allegro.pl/kategoria/czesci-do-maszyn-i-innych-pojazdow-99022?miejsce-wysylki=chiny'
    },
    {name: '收藏品', url: 'https://allegro.pl/kategoria/kolekcje?miejsce-wysylki=chiny'},
    {name: '工业', url: 'https://allegro.pl/kategoria/przemysl-16696?miejsce-wysylki=chiny'},
    {name: '办公与广告', url: 'https://allegro.pl/kategoria/biuro-i-reklama-64477?miejsce-wysylki=chiny'},
    {name: '手机配件', url: 'https://allegro.pl/kategoria/akcesoria-gsm-348?miejsce-wysylki=chiny'},
    {name: '无线通信', url: 'https://allegro.pl/kategoria/radiokomunikacja-446?miejsce-wysylki=chiny'},
    {name: '移动电源', url: 'https://allegro.pl/kategoria/powerbanki-252023?miejsce-wysylki=chiny'},
    {
        name: '智能手表及配件（带表带、充电器等）',
        url: 'https://allegro.pl/kategoria/smartwatche-i-akcesoria-paski-i-bransolety-257989?miejsce-wysylki=chiny'
    },
    {
        name: '智能手表及配件（充电器与底座）',
        url: 'https://allegro.pl/kategoria/smartwatche-i-akcesoria-ladowarki-i-stacje-dokujace-261732?miejsce-wysylki=chiny'
    },
    {
        name: '智能手表配件（保护膜与保护壳）',
        url: 'https://allegro.pl/kategoria/smartwatche-i-akcesoria-etui-261196?miejsce-wysylki=chiny'
    },
    {
        name: '智能手表配件（保护膜与钢化膜）',
        url: 'https://allegro.pl/kategoria/smartwatche-i-akcesoria-folie-i-szkla-ochronne-261195?miejsce-wysylki=chiny'
    },
    {name: '电脑', url: 'https://allegro.pl/kategoria/komputery?miejsce-wysylki=chiny'},
    {name: '小型家电', url: 'https://allegro.pl/kategoria/agd-drobne-67414?miejsce-wysylki=chiny'},
    {name: '电视与视频', url: 'https://allegro.pl/kategoria/tv-i-video-717?miejsce-wysylki=chiny'},
    {name: '游戏机与自动游戏机', url: 'https://allegro.pl/kategoria/konsole-i-automaty?miejsce-wysylki=chiny'},
    {name: '自由立式家电', url: 'https://allegro.pl/kategoria/agd-wolnostojace-67413'},
    {name: '摄影器材', url: 'https://allegro.pl/kategoria/fotografia?miejsce-wysylki=chiny'},
    {name: '女性鞋子', url: 'https://allegro.pl/kategoria/obuwie-damskie-531?miejsce-wysylki=chiny'},
    {name: '女性珠宝', url: 'https://allegro.pl/kategoria/bizuteria-damska-123422?miejsce-wysylki=chiny'},
    {
        name: '帽子与鸭舌帽',
        url: 'https://allegro.pl/kategoria/nakrycia-glowy-czapki-z-daszkiem-5553?miejsce-wysylki=chiny'
    },
    {name: '手袋与配饰', url: 'https://allegro.pl/kategoria/galanteria-i-dodatki-torebki-1492?miejsce-wysylki=chiny'},
    {name: '男性手表', url: 'https://allegro.pl/kategoria/zegarki-meskie-19865?miejsce-wysylki=chiny'},
    {name: '冬季时尚潮流', url: 'https://allegro.pl/kategoria/moda?string=winter%20trends&miejsce-wysylki=chiny'},
    {name: '配饰', url: 'https://allegro.pl/kategoria/galanteria-i-dodatki-1487?miejsce-wysylki=chiny'},
    {name: '服装与鞋子配件', url: 'https://allegro.pl/kategoria/odziez-obuwie-dodatki?miejsce-wysylki=chiny'},
    {name: '珠宝与手表', url: 'https://allegro.pl/kategoria/bizuteria-i-zegarki?miejsce-wysylki=chiny'}
];
(async () => {
    const fetch = (await import('node-fetch')).default;

    // 分页请求处理
    let currentCategoryIndex = 0;
    let currentPage = 16;
    const maxPages = 100;  // 每个分类最多请求 30 页
    let startTime = Date.now();  // 记录开始执行时间
    let isCompleted = false;  // 标识请求是否全部完成

    // // 设置每 8 秒请求一次
    // const intervalId = setInterval(() => {
    //     console.log("开始时间", startTime)
    //     if (currentCategoryIndex < categories.length) {
    //         const category = categories[currentCategoryIndex];
    //         console.log(`正在请求: ${category.name} - 第 ${currentPage} 页`);
    //         let cookie = "";
    //         if (currentPage === 16) {
    //             cookie="cmuid=90205531-ec74-4b4c-8a95-49986067b911; _gcl_au=1.1.640494160.1735788908; gdpr_permission_given=1; _ga=GA1.1.1252726110.1735788926; _ga_G64531DSC4=GS1.1.1735788926.1.0.1735789133.60.0.0; __gads=ID=102a949be5e9a3cb:T=1736407609:RT=1736407609:S=ALNI_MaSn4fsiA2vQnFlGMtRJYDSjLre-w; __gpi=UID=00000fb1ef8e0f7b:T=1736407609:RT=1736407609:S=ALNI_Ma7uTrhokPf16I2fHBMl7pkaIznug; __eoi=ID=7fe629eab8c63dff:T=1736407609:RT=1736407609:S=AA-AfjZF5NyOFdVyXeHerD4D4iWW; wdctx=v5.XC-KrUKLMgBcKNxcOANqBx0UdpF9jcdiRymzbRAWVZ-o2JWYGk6vcFnCIiI0WiLtJPzNcTi2XFieqtminpucyvtk1NV9uzxz_PK7wf0kB1kQHljLMHBz4CtGZaa9qrlEOlCXuL-mStNG0nkeD3o_uO4Xf04_WW7xEb9mHrRk_B3FC0l9wpmL2uijGKXOfALgy9iahQoJSzY1vHLknaAtDCDfYFqgAj6Xee6xwfnFvmBwqqw.WvQZlFTNThC2v1IX4P5CBQ.3-Lqy2ezJvo; datadome=HH4YhJmecfMV~~MbstJrNDOLPQsy0EMfREmsJZR9dm_52jJXdtKLDlU5BC4FmipB6XcY8nj_L3y86rW1YwtwzNapUiv83kMeCOq9x8WiJss5YA~r"
    //         }
    //         // 请求当前分类的当前页
    //         fetchData(category.url, currentPage, cookie)
    //             .then(response => {
    //                 console.log(response)
    //                 if (response.code === 0) {
    //                     // 请求成功，继续分页处理
    //                     console.log(`请求成功: ${category.name} 第 ${currentPage} 页`);
    //                     let data=JSON.parse(response.data);
    //                     let elements = data['product listing items'].items.elements;
    //                     let filteredElements = elements.filter(element => element.type !== 'label');
    //                     let productList = [];
    //                     filteredElements.forEach((item) => {productList.push(item.url)})
    //                     insertProduct(productList);
    //                     // 分页处理
    //                     if (currentPage < maxPages) {
    //                         currentPage++;
    //                     } else {
    //                         // 如果当前分类的页面请求完，切换到下一个分类
    //                         currentCategoryIndex++;
    //                         currentPage = 1;  // 重置为第一页
    //                     }
    //                 } else if (response === 403) {
    //                     // 如果返回 403 错误，计算并输出总花费时间
    //                     let elapsedTime = (Date.now() - startTime) / 1000;  // 转为秒
    //                     console.log(`遇到 403 错误，总花费时间：${elapsedTime} 秒`);
    //                     clearInterval(intervalId);  // 清除定时器
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error("请求失败", error);
    //             });
    //
    //     } else if (!isCompleted) {
    //         // 如果所有分类都请求完毕，且没有出现 403 错误
    //         isCompleted = true;
    //         let elapsedTime = (Date.now() - startTime) / 1000;  // 转为秒
    //         console.log(`所有分类请求完成，总花费时间：${elapsedTime} 秒`);
    //
    //         // 继续轮询请求
    //         console.log('继续轮询请求...');
    //         currentCategoryIndex = 0;  // 重置分类索引
    //         currentPage = 1;  // 重置页码
    //         startTime = Date.now();  // 重新记录时间
    //     }
    // }, 10000);  // 每 8 秒请求一次

    const intervalId = setInterval(() => {
        getProductDetail('https://allegro.pl/oferta/o-squeeze-pouch-stacja-napelniania-do-polstalego-16337397154').then((data) => {
            console.log("商品详情数据",data.data);
            analyzeData(data.data)
        })
    }, 8000);

    // 模拟 fetchData 请求
    async function fetchData(url, page, cookie) {
        const requestData = {
            sourceUrl: url,
            p: page,
            cookie: cookie
        };

        try {
            const response = await fetch('http://192.168.1.63:48080/admin-api/wuyou/basic-data/getCategoryData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer test1',
                    "tenant-id":'1'
                },
                body: JSON.stringify(requestData)
            });
            return response.json();
        } catch (error) {
            throw error;
        }
    }
    async function insertProduct(productList) {
        const requestData = {
            productList: productList
        };

        try {
            const response = await fetch('http://192.168.1.63:48080/admin-api/wuyou/product-url/createBatch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer test1',
                    "tenant-id":'1'
                },
                body: JSON.stringify(requestData)
            });
            return response.json();
        } catch (error) {
            throw error;
        }
    }

    async  function getProductDetail(sourceUrl){
        const requestData = {
            sourceUrl: sourceUrl
        };

        try {
            const response = await fetch('http://192.168.1.63:48080/admin-api/wuyou/basic-data/getOneProductDetail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer test1',
                    "tenant-id":'1'
                },
                body: JSON.stringify(requestData)
            });
            return response.json();
        } catch (error) {
            throw error;
        }
    }



    function analyzeData(res){
        res = JSON.parse(res);
        var productHeader = {};
        if (res["allegro.showoffer.productHeader"] !== undefined)
            productHeader = res["allegro.showoffer.productHeader"];
        else
            productHeader = res["showoffer.productHeader"];
        try {
            console.log("sdsadsafjhkafa")
            //多变体为null时，从另一处取多变体键值,优先取值allegro.showoffer.variants中的变体，原变体结构不全了
            if (productHeader
                && productHeader.offer
                && res["allegro.showoffer.variants"]
                && res["allegro.showoffer.variants"].productVariants
                && res["allegro.showoffer.variants"].productVariants.offerSeller
                && res["allegro.showoffer.variants"].productVariants.offerSeller.variantGroups
                && res["allegro.showoffer.variants"].productVariants.offerSeller.variantGroups.length > 0) {
                let tempVariantSetArr = [];
                let variantGroups = res["allegro.showoffer.variants"].productVariants.offerSeller.variantGroups;
                for (let i = 0; i < variantGroups.length; i++) {
                    let variantGroup = variantGroups[i];
                    if (variantGroup.name && variantGroup.variants && variantGroup.variants.length > 0) {
                        let name = variantGroup.name;
                        let values = [];
                        for (let j = 0; j < variantGroup.variants.length; j++) {
                            let variant = variantGroup.variants[j];
                            if (!variant.name)
                                variant.name = variant.id;
                            values.push({
                                "value": variant.name,
                                "image": variant.image,
                                "selected": variant.selected,
                                "enabled": variant.available,
                                "offer": variant.offer
                            });
                        }
                        tempVariantSetArr.push({ "name": name, "attributes": values });
                    }
                }
                if (tempVariantSetArr.length > 0) {
                    productHeader.offer.variantSet = { "attributeSet": tempVariantSetArr };
                }
            }
            console.log(productHeader);
            let delivery=productHeader.offer.shipping.delivery.cheapestMethod.price.amount
           let date=btoa(encodeURI(JSON.stringify(productHeader)))
            SaveLiknProduct(productHeader,1,"https://allegro.pl/oferta/o-squeeze-pouch-stacja-napelniania-do-polstalego-16337397154",delivery);
        } catch (e) {

        }


    }
    async  function SaveLiknProduct(html,sourcePlatform,sourceUrl,delivery){
        const requestData = {
            dataJson: html,
            sourcePlatform:sourcePlatform,
            url:sourceUrl,
            delivery:delivery,


        };

        try {
            const response = await fetch('http://192.168.1.63:48080/admin-api/wuyou/basic-data/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer test1',
                    "tenant-id":'1'
                },
                body: JSON.stringify(requestData)
            });
            console.log("保存完成",response.json());
            return response.json();
        } catch (error) {
            throw error;
        }
    }
})();
