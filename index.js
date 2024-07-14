const puppeteer = require('puppeteer-core');
const fs = require('fs');
const xlsx = require('xlsx');
const add_to_sheet = require('./add_to_sheet');

const aptUrlList = [

  {
    'name': '건영',
    'url': 'https://new.land.naver.com/complexes/100235?ms=37.507801,126.9465945,17&a=APT:ABYG:JGC&e=RETAIL&ad=true'
  },

  {
    'name': 'e편한세상상도노빌리티',
    'url': 'https://new.land.naver.com/complexes/113097?ms=37.505046,126.9441525,17&a=APT:ABYG:JGC&e=RETAIL&ad=true'
  },

  {
    'name': '상도 브라운스톤',
    'url': 'https://new.land.naver.com/complexes/10129?ms=37.506116,126.9405335,17&a=APT:ABYG:JGC&e=RETAIL&ad=true'
  },
  {
    'name': '신동아 리버파크',
    'url': 'https://new.land.naver.com/complexes/3280?ms=37.507853,126.9413455,17&a=APT:ABYG:JGC&e=RETAIL&ad=true'
  },
  {
    'name': '우성',
    'url': 'https://new.land.naver.com/complexes/362?ms=37.509782,126.9444175,17&a=APT:ABYG:JGC&e=RETAIL&ad=true'
  },
  {
    'name': '본동 신동아',
    'url': 'https://new.land.naver.com/complexes/372?ms=37.509888,126.9482845,17&a=APT:ABYG:JGC&e=RETAIL&ad=true'
  },
  {
    'name': '본동 래미안',
    'url': 'https://new.land.naver.com/complexes/9311?ms=37.50991,126.9466445,17&a=APT:ABYG:JGC&e=RETAIL&ad=true'
  },
  {
    'name': '경동 윈츠리버',
    'url': 'https://new.land.naver.com/complexes/9310?ms=37.510043,126.9510965,17&a=APT:ABYG:JGC&e=RETAIL&ad=true'
  },
  {
    'name': '한신 휴 플러스',
    'url': 'https://new.land.naver.com/complexes/12010?ms=37.509136,126.9467455,17&a=APT:ABYG:JGC&e=RETAIL&ad=true'
  },
  {
    'name': '쌍용예가',
    'url': 'https://new.land.naver.com/complexes/26310?ms=37.510104,126.943567,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '삼익(주상복합)',
    'url': 'https://new.land.naver.com/complexes/932?ms=37.5105197,126.9452639,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '한강쌍용',
    'url': 'https://new.land.naver.com/complexes/934?ms=37.5126473,126.9517441,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '극동(강변)',
    'url': 'https://new.land.naver.com/complexes/370?ms=37.5121877,126.9520552,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '래미안트윈파크',
    'url': 'https://new.land.naver.com/complexes/100694?ms=37.5136678,126.9519587,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '유원강변',
    'url': 'https://new.land.naver.com/complexes/933?ms=37.5145869,126.9502314,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '상도패리스',
    'url': 'https://new.land.naver.com/complexes/11569?ms=37.5036762,126.953847,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '힐스테이트상도프레스티지',
    'url': 'https://new.land.naver.com/complexes/22846?ms=37.4971987,126.9461222,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '힐스테이트상도센트럴파크',
    'url': 'https://new.land.naver.com/complexes/22491?ms=37.4971987,126.9461222,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '상도중앙하이츠빌',
    'url': 'https://new.land.naver.com/complexes/8987?ms=37.4988307,126.9470503,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '상도역롯데캐슬파크엘',
    'url': 'https://new.land.naver.com/complexes/133962?ms=37.5016311,126.9424369,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '상도더샵1차',
    'url': 'https://new.land.naver.com/complexes/22789?ms=37.5019545,126.940216,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '상도더샵2차',
    'url': 'https://new.land.naver.com/complexes/107317?ms=37.5022609,126.9398298,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '상도동원베네스트',
    'url': 'https://new.land.naver.com/complexes/23116?ms=37.50308,126.94456,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '상도두산위브',
    'url': 'https://new.land.naver.com/complexes/26482?ms=37.5041876,126.94456,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '상도두산위브트레지움2차',
    'url': 'https://new.land.naver.com/complexes/110919?ms=37.5041876,126.94456,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '상도파크자이',
    'url': 'https://new.land.naver.com/complexes/109124?ms=37.5053947,126.9348289,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '상도효성해링턴플레이스',
    'url': 'https://new.land.naver.com/complexes/110958?ms=37.5053692,126.9367172,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '상도래미안1차',
    'url': 'https://new.land.naver.com/complexes/3383?ms=37.5056075,126.9319214,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '상도아이파크',
    'url': 'https://new.land.naver.com/complexes/8753?ms=37.5005816,126.9444186,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '상도롯데캐슬비엔',
    'url': 'https://new.land.naver.com/complexes/27524?ms=37.4975385,126.9380135,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '래미안상도2차',
    'url': 'https://new.land.naver.com/complexes/8926?ms=37.4983812,126.9531674,17&a=APT:ABYG:JGC&e=RETAIL'
  },
  {
    'name': '래미안상도3차',
    'url': 'https://new.land.naver.com/complexes/9194?ms=37.4990726,126.9523305,17&a=APT:ABYG:JGC&e=RETAIL'
  },
]

const crawler = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });
    const page = await browser.newPage();

    let result = [['브랜드', '동', '형식', '가격', '월세', '공급면적', '전용면적', '층수', '방향']];

    //아파트 리스트 반복문
    for (let [i, r] of aptUrlList.entries()) {
      await page.goto(r.url);

      //동일 매물 묶기
      await page.evaluate(() => {
        const binderCheckbox = document.getElementById('address_group2').checked;
        if (binderCheckbox == false) {
          page.click('input[id="address_group2"]');
        }
      })

      //스크롤 최하단까지 내리기
      for (let i = 1; i < 6; i++) {
        await page.evaluate(() => {
          //alert('Scroll Down')
          const itemListSelector = 'div.item_list.item_list--article';
          const itemList = document.querySelector(itemListSelector);
          itemList.scrollBy(0, itemList.scrollHeight);
        })
        await page.waitForTimeout(1500);
        //
        /*
        await page.waitForResponse((response) => {
          console.log('res')
          return response.url().includes('realEstateType=APT')
        })
        */
      }
      //스크롤 최하단까지 내리기_

      //데이터 수집
      const data = await page.evaluate(() => {
        const buildingNameSelector = 'div.item_title span.text';
        const transactionTypeSelector = 'div.price_line span.type';
        const priceSelector = 'div.price_line span.price';
        //const buildingTypeSelector = 'div.info_area strong.type';
        const SpecSelector = 'div.info_area span.spec';
        //const agentNameSelector = 'div.cp_area '
        const itemFrameSelector = 'div.item.false';
        const tagSelector = 'div.tag_area span.tag'

        const buildingNameArray = [];
        const buildingNumArray = [];
        const transactionTypeArray = [];
        const priceArray = [];
        const rentArray = [];
        const exclusiveAreaArray = [];
        const supplyAreaArray = [];
        const floorArray = [];
        const directionArray = [];
        //const tagsArray = [];

        const ItemFrame = document.querySelectorAll(itemFrameSelector);
        if (ItemFrame) {
          ItemFrame.forEach((v) => {
            let buildingName = v.querySelector(buildingNameSelector).innerText.split(' ');
            if (buildingName) {
              buildingNameArray.push(buildingName[0]);
              buildingNumArray.push(buildingName[1]);
            }
            let transactionType = v.querySelector(transactionTypeSelector).innerText;
            if (transactionType) {
              transactionTypeArray.push(transactionType);
            }

            let cost = v.querySelector(priceSelector).innerText;
            if (cost) {
              if (cost.includes('/')) {
                let deposit = cost.split('/')[0];
                let rent = cost.split('/')[1];
                rentArray.push(Number(rent));
                if (deposit.includes('억')) {
                  let digitizedPrice = deposit.split('억');
                  priceArray.push(Number(digitizedPrice[0]) * 10000 + Number(digitizedPrice[1].trim().replace(',', '')))
                } else {
                  priceArray.push(Number(deposit.replace(',', '')))
                }
              } else {
                if (cost.includes('억')) {
                  let digitizedPrice = cost.split('억');
                  rentArray.push(Number('0'))
                  priceArray.push(Number(digitizedPrice[0]) * 10000 + Number(digitizedPrice[1].trim().replace(',', '')))
                } else {
                  priceArray.push(Number(cost.replace(',', '')))
                }
              }
            }

            let spec = v.querySelector(SpecSelector).innerText.split(', ');
            if (spec) {
              supplyAreaArray.push(spec[0].slice(0, spec[0].indexOf('/')));
              exclusiveAreaArray.push(Number(spec[0].slice(spec[0].indexOf('/') + 1, spec[0].length - 2)));
              let floor = spec[1].slice(0, spec[1].indexOf('/'));
              floorArray.push(Number(floor) ? Number(floor) : floor);
              directionArray.push(spec[2].replace(', ', ''))
            }

            //let tags = v.querySelectorAll(tagSelector)

            //v.parentElement.removeChild(v);
          })
        }

        return [
          buildingNameArray,
          buildingNumArray,
          transactionTypeArray,
          priceArray,
          rentArray,
          supplyAreaArray,
          exclusiveAreaArray,
          floorArray,
          directionArray
        ]
      })
      const transposed = data.reduce(
        (result, row) => row.map((_, i) => [...(result[i] || []), row[i]]),
        []
      );
      result = result.concat(transposed);
      //데이터 수집_
    }//아파트 리스트 반복문_

    console.log(result);


    //파일 생성
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDay();
    let hours = today.getHours();
    let mins = today.getMinutes();
    //let docTitle = `${year}${month}${day}`
    let docTitle = year + "-" + (("00" + month.toString()).slice(-2)) + "-" + (("00" + day.toString()).slice(-2));
    let currentTime = (("00" + hours.toString()).slice(-2)) + "-" + (("00" + mins.toString()).slice(-2));

    const book = xlsx.utils.book_new();
    const sheet = xlsx.utils.aoa_to_sheet(result);
    await xlsx.utils.book_append_sheet(book, sheet, currentTime)
    await xlsx.writeFile(book, `${docTitle}_${currentTime}.xlsx`);
    //파일 생성

    await page.close();
    await browser.close();
  } catch (e) {
    console.error(e);
  }

}
crawler();