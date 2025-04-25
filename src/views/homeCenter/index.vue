<template>
  <div
    id="map"
    style="
      z-index: 100;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    "
  ></div>
</template>

<script>
import * as Cesium from "cesium";
import {
  Cesium3DTileset,
  Viewer,
  WebMapTileServiceImageryProvider
} from "cesium";
import { onMounted } from "vue";

export default {
  name: "MapComponent",
  setup() {
    //初始化地图
    let viewer;

    function initMap() {
      const tianDiTuToken = "0897ab34ef9d7253a231698374bc7a2c";
      const mapOption = {
        url: `http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${tianDiTuToken}`,
        layer: "tdtBasicLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
        maximumLevel: 18
      };
      const imgProvider = new WebMapTileServiceImageryProvider(mapOption);

      const viewerOption = {
        animation: false, //是否创建动画小器件，左下角仪表
        baseLayerPicker: false, //是否显示图层选择器
        fullscreenButton: false, //是否显示全屏按钮
        geocoder: false, //是否显示geocoder小器件，右上角查询按钮
        homeButton: false, //是否显示Home按钮
        infoBox: false, //是否显示信息框
        sceneModePicker: false, //是否显示3D/2D选择器
        scene3DOnly: false, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
        selectionIndicator: false, //是否显示选取指示器组件
        timeline: false, //是否显示时间轴
        navigationHelpButton: false, //是否显示右上角的帮助按钮
        baselLayerPicker: false, // 将图层选择的控件关掉，才能添加其他影像数据
        shadows: true, //是否显示背影
        shouldAnimate: true,
        imageryProvider: imgProvider
      };

      viewer = new Viewer("map", viewerOption);
      // 添加中文注记图层
      viewer.imageryLayers.addImageryProvider(
        new WebMapTileServiceImageryProvider({
          url: `http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=${tianDiTuToken}`,
          layer: "tdtAnnoLayer",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible",
          show: false
        })
      );
      //优化项--关闭相关特效
      viewer.scene.debugShowFramesPerSecond = true; //显示fps
      viewer.scene.moon.show = false; //月亮
      viewer.scene.fog.enabled = false; //雾
      viewer.scene.sun.show = false; //太阳
      viewer.scene.skyBox.show = false; //天空盒
      viewer.resolutionScale = 1.0; //画面细度，默认值为1.0
      //去除版权信息
      viewer._cesiumWidget._creditContainer.style.display = "none";
    }

    //加载倾斜摄影图像
    function init3Dtiles() {
      const tileSet = new Cesium3DTileset({
        url: "http://localhost:5173/tileset.json",
        maximumMemoryUsage: 100, //不可设置太高，目标机子空闲内存值以内，防止浏览器过于卡
        maximumScreenSpaceError: 64, //用于驱动细节细化级别的最大屏幕空间错误;较高的值可提供更好的性能，但视觉质量较低。
        maximumNumberOfLoadedTiles: 1000, //最大加载瓦片个数
        shadows: false, //是否显示阴影
        skipLevelOfDetail: true, // 确定是否应在遍历期间应用详细级别跳过(默认false)
        baseScreenSpaceError: 1024, //When skipLevelOfDetailis true，在跳过详细级别之前必须达到的屏幕空间错误(默认1024)
        skipScreenSpaceErrorFactor: 16, // 定义要跳过的最小屏幕空间错误的乘数。与 一起使用skipLevels来确定要加载哪些图块(默认16)
        skipLevels: 1, //skipLevelOfDetail是true 一个常量，定义了加载图块时要跳过的最小级别数。为 0 时，不跳过任何级别。与 一起使用skipScreenSpaceErrorFactor来确定要加载哪些图块。(默认1)
        immediatelyLoadDesiredLevelOfDetail: false, //当skipLevelOfDetail是时true，只会下载满足最大屏幕空间错误的图块。忽略跳过因素，只加载所需的图块(默认false)
        loadSiblings: false, // 如果为true则不会在已加载完概况房屋后，自动从中心开始超清化房屋 --- 何时确定在遍历期间skipLevelOfDetail是否true始终下载可见瓦片的兄弟姐妹(默认false)
        cullWithChildrenBounds: true, //是否使用子边界体积的并集来剔除瓦片（默认true）
        dynamicScreenSpaceError: true, //减少距离相机较远的图块的屏幕空间错误(默认false)
        dynamicScreenSpaceErrorDensity: 0.00278, //数值加大，能让周边加载变快 --- 用于调整动态屏幕空间误差的密度，类似于雾密度(默认0.00278)
        dynamicScreenSpaceErrorFactor: 4.0, // 用于增加计算的动态屏幕空间误差的因素(默认4.0)
        dynamicScreenSpaceErrorHeightFalloff: 0.25 //密度开始下降的瓦片集高度的比率(默认0.25)
      });

      viewer.scene.primitives.add(tileSet);
      viewer.zoomTo(tileSet);

      //加载后调整倾斜摄影的位置、角度等参数
      tileSet?.readyPromise.then((tileset) => {
        update3dtilesMaxtrix(tileset);
      });
    }

    //更新倾斜摄影位置
    function update3dtilesMaxtrix(tileSet) {
      //调整参数
      let params = {
        tx: 113, //模型中心X轴坐标（经度，单位：十进制度）
        ty: 22, //模型中心Y轴坐标（纬度，单位：十进制度）
        tz: 40, //模型中心Z轴坐标（高程，单位：米）
        rx: 0, //X轴（经度）方向旋转角度（单位：度）
        ry: 0, //Y轴（纬度）方向旋转角度（单位：度）
        rz: 2, //Z轴（高程）方向旋转角度（单位：度）
        scale: 1.3 //缩放比例
      };
      //旋转
      const mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(params.rx));
      const my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(params.ry));
      const mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(params.rz));
      const rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
      const rotationY = Cesium.Matrix4.fromRotationTranslation(my);
      const rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
      //平移
      const position = Cesium.Cartesian3.fromDegrees(
        params.tx,
        params.ty,
        params.tz
      );
      const m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
      //旋转、平移矩阵相乘
      Cesium.Matrix4.multiply(m, rotationX, m);
      Cesium.Matrix4.multiply(m, rotationY, m);
      Cesium.Matrix4.multiply(m, rotationZ, m);
      //比例缩放
      const scale = Cesium.Matrix4.fromUniformScale(params.scale);
      Cesium.Matrix4.multiply(m, scale, m);
      console.log("矩阵m:", m);
      //赋值给tileset
      tileSet._root.transform = m;
    }

    onMounted(() => {
      initMap();
      init3Dtiles();
    });
  }
};
</script>

<style scoped>
@import url("../../../node_modules/cesium/Source/Widgets/widgets.css");

html,
body,
#map {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
