<template>
    <el-skeleton
      :loading="isLoading"
      style="width: 100%; height: 100%; padding: 5px; opacity: 0.9"
      animated
      :throttle="500"
    >
      <template #template>
        <div style="width: 100%; height: 100%; display: flex; align-items: center">
          <div style="width: 168px; height: 100%; padding: 10px">
            <el-skeleton-item
              variant="rect"
              :style="{width: '100%', height: '100%'}"
            ></el-skeleton-item>
          </div>
          <div style="width: calc(100%); height: 100%; padding: 10px">
            <el-skeleton-item
              variant="rect"
              :style="{width: '100%', height: '100%'}"
            ></el-skeleton-item>
          </div>
        </div>
      </template>
    </el-skeleton>
  </template>
  
  <script>
  import {ElSkeleton, ElSkeletonItem} from 'element-plus'
  
  export default {
    components: {
      ElSkeleton,
      ElSkeletonItem,
    },
    data() {
      return {
        isLoading: true,
      }
    },
  }
  </script>
  