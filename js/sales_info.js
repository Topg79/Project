// 분양 정보 자바스크립트

// 플리커 활용 (Shim_Portfolio_202212)

// key : 279900eb1e2399803d846658b1cf7e1d

// https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

// https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

// flickr.interestingness.getList

const base = "https://www.flickr.com/services/rest/?";
const method = "flickr.interestingness.getList";
const key = "279900eb1e2399803d846658b1cf7e1d";
const per_page = 500;
const format = "json";
const frame = document.querySelector("#list");

const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;

//해당 url값으로 비동기식 데이터 호출
fetch(url)
  .then((data) => {
    // console.log(data);  //가져온 데이터 전체를 보여줌
    let result = data.json();  //가겨온 데이터 중에서 json(제이슨) 형태의 값으로 변환함
    // console.log(result); //결과로 만들어진 데이터를 보여준다
    return result; //해당 결과를 리턴(반환)해줘야 쓸수 있다
  })
  .then((json) => {
    //반환된 값을 json이라는 매개변수로 받은뒤
    let items = json.photos.photo;  //콘솔에서 본것처럼 그안의 photos안의 photo로 접근함
    // console.log(items); //500장의 사진이 json 객체배열로 가져와짐

    let htmls = "";

    items.map((el) => {
      console.log(el);

      // 이미지의 썸네일 url 주소  
      let imgSrc = ` https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;

      //큰 이미지 url 주소
      let imgSrcBig = ` https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;

      htmls += `
        <li class="item">
          <div>
            <a href=${imgSrcBig}>
              <img src=${imgSrc}>
            </a>
            <p>${el.title}</p>
          </div>
        </li>
      `;
    }) //end of map

    frame.innerHTML = htmls;

    //로딩이 다 된것을 확인하는 방법
    const imgs = frame.querySelectorAll("img");
    const len = imgs.length;

    let count = 0;

    for (let el of imgs) {
      el.addEventListener("load", () => {
        count++;  //로드할때마다 count를 증가시킨다

        //로딩이 다 되면
        if (count == len) {
          isoLayout();
        }
      })
    }



  })

//isotope layout 플러그인을 적용시키는 함수 생성
function isoLayout() {

  frame.classList.add("on");

  new Isotope("#list", {
    itemSelection: ".item",
    columnWidth: ".item",
    transitionDuration: "0.5s",
  });
}