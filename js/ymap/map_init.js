ymaps.ready(init);

function init() {
    var myPlacemark,
        myMap = new ymaps.Map('map', {
            center: [55.753994, 37.622093],
            zoom: 9,
            behaviors: ['default', 'scrollZoom']
        }, {
            searchControlProvider: 'yandex#search'
        }),
        myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point"
            }
        });

    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');
        $('input#coords-x').val(coords[0].toPrecision(6));
        $('input#coords-y').val(coords[1].toPrecision(6));
        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });

    $.get('/getPlacemarks', function(res){
        console.log(res);
        clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            groupByCoordinates: false,
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false
        });
        var geoObjects = [];
        res.forEach(function(element){
            var coords = [];
            coords[0] = element['coords-x'];
            coords[1] = element['coords-y'];
            var pm = new ymaps.Placemark(coords,{
                // balloonContent: element['book'],
                balloonContentHeader: element['book']+(', '+element['author']?element['author']:''),
                balloonContentBody: 'добавим ещё кастомное описание<br>'+
                    '<button type="submit" class="btn btn-primary book-taken" data-id="'+element['id']+'">Забрал</button>',
                balloonContentFooter: element['city']+','+element['street']+','+element['house'],
                clusterCaption: element['book']
            }, {
                preset: 'islands#violetIcon'
            });
            geoObjects.push(pm);
        });
        clusterer.add(geoObjects);
        myMap.geoObjects.add(clusterer);
    });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent: firstGeoObject.getAddressLine()
                });
            var city = firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas();
            var street = firstGeoObject.getThoroughfare();
            var house = firstGeoObject.getPremiseNumber();
            $('#city').val(city);
            $('#street').val(street);
            $('#house').val(house);
        });
    }
}
