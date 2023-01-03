//2a703a1d1d4966263b4dc2278318c20d

var mapContainer = document.getElementById('map');
const t_on = document.querySelectorAll('.traffic li')[0];
const t_off = document.querySelectorAll('.traffic li')[1];
const branch_btns = document.querySelectorAll('.branch li');

mapOption = {
	center: new kakao.maps.LatLng(33.450701, 126.570667),
	level: 3,
};

var map = new kakao.maps.Map(mapContainer, mapOption);
