<template>
    <div :id="mapName">
    </div>
</template>

<script>
export default {
    name: 't-map',
    props:['name'],
    mounted(){
        this.initTmap();
    },
    data:function(){
        return {
            mapName : this.name + '-map',
        }
    },
    methods:{
        initTmap(){
				var map = new Tmap.Map({
					div: document.getElementById(this.mapName),
					width : "934px",
					height : "452px",
				});
				map.setCenter(new Tmap.LonLat("126.986072", "37.570028").transform("EPSG:4326", "EPSG:3857"), 15);
			}
    }
}
</script>

<style>

</style>
