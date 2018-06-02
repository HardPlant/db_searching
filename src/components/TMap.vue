<template>
    <div :id="mapName">
    </div>
</template>

<script>
export default {
    name: 't-map',
    props:['name'],
    data:function(){
        return {
            mapName : this.name + '-map',
        }
    },
    methods:{
        init : function(){
            let el = document.createElement('script'), self = this;
                el.setAttribute('type', 'text/javascript');
                el.setAttribute('src', "https://api2.sktelecom.com/tmap/js?version=1&format=javascript&appKey=8c2211b0-fc16-48ce-b043-2e86ffe8996f");
                el.onload = function(){
                    var map = new Tmap.Map({
					div: document.getElementById(this.mapName),
					width : "934px",
					height : "452px",
				});
				map.setCenter(new Tmap.LonLat("126.986072", "37.570028").transform("EPSG:4326", "EPSG:3857"), 15);
			
                };

        },
        mounted(){
            this.init();
        }
    }
}
</script>

<style>

</style>
