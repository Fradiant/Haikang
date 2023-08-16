<template>
  <div class="teamInfoPages">
    <!-- <el-row>
          <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
              <el-card :body-style="{ padding: '0px' }">
                  <div style="padding: 14px;">
                      <span>好吃的汉堡</span>
                      <div class="bottom clearfix">
                          <time class="time">{{ currentDate }}</time>
                          <el-button type="text" class="button">操作按钮</el-button>
                      </div>
                  </div>
              </el-card>
          </el-col>
      </el-row> -->
    <el-row>
      <el-col
        :span="8"
        v-for="(o, index) in 3"
        :key="o"
        :offset="index > 0 ? 2 : 0"
      >
        <div class="SchedualQueryCard-container">
          <div class="SchedualQueryCard-title">
            <div class="SchedualQueryCard-name">01</div>
            <div class="SchedualQueryCard-status SchedualQueryCard-status-3">
              待巡更
            </div>
          </div>
          <div class="SchedualQueryCard-tags">
            <div class="SchedualQueryCard-tag">
              <span class="PatrolQuery-icon PatrolQuery-route"></span>
              路线1分钟无序
            </div>
            <div class="SchedualQueryCard-tag">
              <span class="PatrolQuery-icon PatrolQuery-time"></span>
              09:18:15~09:19:15
            </div>
            <div class="SchedualQueryCard-tag">
              <span class="PatrolQuery-icon PatrolQuery-person"></span>
              人员01名称
            </div>
            <div class="SchedualQueryCard-tag">
              <span class="PatrolQuery-icon PatrolQuery-method"></span>
              全无序
            </div>
          </div>
          <div class="SchedualQueryCard-patrolPointItem">
            <div class="SchedualQueryCard-patrolPointName">巡更点01</div>
            <div class="SchedualQueryCard-patrolTime">
              <span>巡更时间</span>
              <span>{{ currentDate }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Card",
  data() {
    return {
      currentDate: new Date()
    };
  }
};
</script>

<style scoped>
.el-col-offset-2 {
  margin-left: 0px;
}
.time {
  font-size: 13px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.button {
  padding: 0;
  float: right;
}
.image {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.SchedualQueryCard-container {
  height: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  overflow: overlay;
  min-width: 320px;
  margin-right: 20px;
  flex: 1 1;
  max-width: 22vw;
  z-index: 99;
  cursor: pointer;
  border: 3px solid pink;
}

.SchedualQueryCard-container .SchedualQueryCard-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  margin-bottom: 15px;
}

.SchedualQueryCard-container
  .SchedualQueryCard-title
  .SchedualQueryCard-status-3 {
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.25);
  color: rgba(0, 0, 0, 0.25);
}

.SchedualQueryCard-container
  .SchedualQueryCard-title
  .SchedualQueryCard-status {
  width: 60px;
  background: rgba(44, 202, 141, 0.1);
  border: 1px solid #2cca8d;
  border-radius: 4px;
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  color: #2cca8d;
  text-align: center;
  font-weight: 400;
  display: inline-block;
}

.SchedualQueryCard-container {
  height: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  overflow: overlay;
  min-width: 320px;
  margin-right: 20px;
  flex: 1 1;
  max-width: 22vw;
  z-index: 99;
  cursor: pointer;
}

.SchedualQueryCard-container .SchedualQueryCard-tags .SchedualQueryCard-tag {
  margin-bottom: 15px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 400;
  display: flex;
  align-items: center;
}

.PatrolQuery-icon.PatrolQuery-route {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOlSURBVFhH7Vc7iBNBGI4vUHygjVj5qARBfJ2VioUgamNjcZ2llS9EQQvRTgvBRm53E/U2m+QuaZxJ4p0g5LjC4zCCIBYiKj5OOUE4EcHr4vdN/uR2snubg1hY3AfDzvf93+zM/DuPJLWIDhSLjaVuVl92fVVH+WWe4NTFkoiMr3Z7vi64vp5C21k+yamLpSu8oHIQbbXjq68srFOTcCKcen35/Xx1W9x43WCkz/HLZ4RGYSbvq5rj6woGvK9UGlvNJzn1pCTUarVlXlZdNwMO1Ll0vrqX7fkkp854t0Sin2tOVn30At3vBKObWEy9qV0VWyzcbPkk2n/BB3uO5wfXLx+QUCqdr+yH9h1z+eH56qLINvilOVmhFkwSEBcaASfHJKULeqNIFqgzTp9IEfArc6Lp4pMNIrVBrZmE+JXglp6uw/s/PRwa3ULuBOU94O8bjYaJ4wPcc7PqAvofQgIe028CYaBBnV9cqAXqjAu1wOXNL9w5efibvQsYp49+kSzAj6Wu+009Vz4G/tkU1KkxRg/rnTDbJqseCTVAXy9aCSGcQJ1AAnyhUaDBby5boRaoMy7UgtnzWOZC2+hMAEEf/UItMDlc8qxz4mm/cpyDZt3EuSXgYb0T8BxBGRZqgIQ8c/Pl7UK7JwAN3iSuAMSFWuBBx70utI24BJgzAX6hFuCf7pYAeljvBPR/kAAeQElnAOJCLUCfjVs50CMJyCi1hn6hFpCYQRxkl0w9ZgswRg/rnYCv9wSUSq9XwDDGyfKLh28B6oyL1ULSCggXaokrAIOFbzqTq24WqQ1qjIUnFAZivSeAcINyH170EyU8+BnqYolgvjMgDklnAIHYefQ3Hr4u5XoeZ0ykCBDvLQG8LnA93MJLvuG6OesV9A5X61V8klNnvHWthMFTnYfTfFdgC91uAYLvx8BH0deASBzXAPofieu7hZ4TgDv+Nl4wEQQja0WyQJ1x+kSygBf39DuAP1oQ/4PSkHNi0svqG0j+TdZF42qEZ+4HDoF373yQrxxFbNjLVXe1tioSUA178b7T2M53hc6huez1VD5fXS9SLBinL2479PpLELExJPeU0FbCNUv4o9BDr1ADTsq0H8QX99W71jw4YfBJJkUS/DaTU4dMozBgzKBcEZoI+ugXGgGXtzkTmKgF/hdIB5XD8L4S2hX0so1Qbpsl6EejnxmMbavIBrJ9X6JMhhP8XwEDv4MBhg/droVtpHkbxeLESqkuYmFIpf4CU3ORoQqe50QAAAAASUVORK5CYII=)
    no-repeat;
  width: 16px;
  height: 16px;
  background-position: -48px 0;
  margin-right: 5px;
}

.PatrolQuery-icon {
  background: url(data:image/png;base64,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)
    no-repeat;
  display: inline-block;
  width: 24px;
  height: 24px;
  position: relative;
  cursor: pointer;
}

.SchedualQueryCard-container .SchedualQueryCard-tags .SchedualQueryCard-tag {
  margin-bottom: 15px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 400;
  display: flex;
  align-items: center;
}

.PatrolQuery-icon.PatrolQuery-time {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOlSURBVFhH7Vc7iBNBGI4vUHygjVj5qARBfJ2VioUgamNjcZ2llS9EQQvRTgvBRm53E/U2m+QuaZxJ4p0g5LjC4zCCIBYiKj5OOUE4EcHr4vdN/uR2snubg1hY3AfDzvf93+zM/DuPJLWIDhSLjaVuVl92fVVH+WWe4NTFkoiMr3Z7vi64vp5C21k+yamLpSu8oHIQbbXjq68srFOTcCKcen35/Xx1W9x43WCkz/HLZ4RGYSbvq5rj6woGvK9UGlvNJzn1pCTUarVlXlZdNwMO1Ll0vrqX7fkkp854t0Sin2tOVn30At3vBKObWEy9qV0VWyzcbPkk2n/BB3uO5wfXLx+QUCqdr+yH9h1z+eH56qLINvilOVmhFkwSEBcaASfHJKULeqNIFqgzTp9IEfArc6Lp4pMNIrVBrZmE+JXglp6uw/s/PRwa3ULuBOU94O8bjYaJ4wPcc7PqAvofQgIe028CYaBBnV9cqAXqjAu1wOXNL9w5efibvQsYp49+kSzAj6Wu+009Vz4G/tkU1KkxRg/rnTDbJqseCTVAXy9aCSGcQJ1AAnyhUaDBby5boRaoMy7UgtnzWOZC2+hMAEEf/UItMDlc8qxz4mm/cpyDZt3EuSXgYb0T8BxBGRZqgIQ8c/Pl7UK7JwAN3iSuAMSFWuBBx70utI24BJgzAX6hFuCf7pYAeljvBPR/kAAeQElnAOJCLUCfjVs50CMJyCi1hn6hFpCYQRxkl0w9ZgswRg/rnYCv9wSUSq9XwDDGyfKLh28B6oyL1ULSCggXaokrAIOFbzqTq24WqQ1qjIUnFAZivSeAcINyH170EyU8+BnqYolgvjMgDklnAIHYefQ3Hr4u5XoeZ0ykCBDvLQG8LnA93MJLvuG6OesV9A5X61V8klNnvHWthMFTnYfTfFdgC91uAYLvx8BH0deASBzXAPofieu7hZ4TgDv+Nl4wEQQja0WyQJ1x+kSygBf39DuAP1oQ/4PSkHNi0svqG0j+TdZF42qEZ+4HDoF373yQrxxFbNjLVXe1tioSUA178b7T2M53hc6huez1VD5fXS9SLBinL2479PpLELExJPeU0FbCNUv4o9BDr1ADTsq0H8QX99W71jw4YfBJJkUS/DaTU4dMozBgzKBcEZoI+ugXGgGXtzkTmKgF/hdIB5XD8L4S2hX0so1Qbpsl6EejnxmMbavIBrJ9X6JMhhP8XwEDv4MBhg/droVtpHkbxeLESqkuYmFIpf4CU3ORoQqe50QAAAAASUVORK5CYII=)
    no-repeat;
  width: 16px;
  height: 16px;
  background-position: -16px 0;
  margin-right: 5px;
}

.SchedualQueryCard-container .SchedualQueryCard-tags .SchedualQueryCard-tag {
  margin-bottom: 15px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 400;
  display: flex;
  align-items: center;
}

.PatrolQuery-icon.PatrolQuery-person {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOlSURBVFhH7Vc7iBNBGI4vUHygjVj5qARBfJ2VioUgamNjcZ2llS9EQQvRTgvBRm53E/U2m+QuaZxJ4p0g5LjC4zCCIBYiKj5OOUE4EcHr4vdN/uR2snubg1hY3AfDzvf93+zM/DuPJLWIDhSLjaVuVl92fVVH+WWe4NTFkoiMr3Z7vi64vp5C21k+yamLpSu8oHIQbbXjq68srFOTcCKcen35/Xx1W9x43WCkz/HLZ4RGYSbvq5rj6woGvK9UGlvNJzn1pCTUarVlXlZdNwMO1Ll0vrqX7fkkp854t0Sin2tOVn30At3vBKObWEy9qV0VWyzcbPkk2n/BB3uO5wfXLx+QUCqdr+yH9h1z+eH56qLINvilOVmhFkwSEBcaASfHJKULeqNIFqgzTp9IEfArc6Lp4pMNIrVBrZmE+JXglp6uw/s/PRwa3ULuBOU94O8bjYaJ4wPcc7PqAvofQgIe028CYaBBnV9cqAXqjAu1wOXNL9w5efibvQsYp49+kSzAj6Wu+009Vz4G/tkU1KkxRg/rnTDbJqseCTVAXy9aCSGcQJ1AAnyhUaDBby5boRaoMy7UgtnzWOZC2+hMAEEf/UItMDlc8qxz4mm/cpyDZt3EuSXgYb0T8BxBGRZqgIQ8c/Pl7UK7JwAN3iSuAMSFWuBBx70utI24BJgzAX6hFuCf7pYAeljvBPR/kAAeQElnAOJCLUCfjVs50CMJyCi1hn6hFpCYQRxkl0w9ZgswRg/rnYCv9wSUSq9XwDDGyfKLh28B6oyL1ULSCggXaokrAIOFbzqTq24WqQ1qjIUnFAZivSeAcINyH170EyU8+BnqYolgvjMgDklnAIHYefQ3Hr4u5XoeZ0ykCBDvLQG8LnA93MJLvuG6OesV9A5X61V8klNnvHWthMFTnYfTfFdgC91uAYLvx8BH0deASBzXAPofieu7hZ4TgDv+Nl4wEQQja0WyQJ1x+kSygBf39DuAP1oQ/4PSkHNi0svqG0j+TdZF42qEZ+4HDoF373yQrxxFbNjLVXe1tioSUA178b7T2M53hc6huez1VD5fXS9SLBinL2479PpLELExJPeU0FbCNUv4o9BDr1ADTsq0H8QX99W71jw4YfBJJkUS/DaTU4dMozBgzKBcEZoI+ugXGgGXtzkTmKgF/hdIB5XD8L4S2hX0so1Qbpsl6EejnxmMbavIBrJ9X6JMhhP8XwEDv4MBhg/droVtpHkbxeLESqkuYmFIpf4CU3ORoQqe50QAAAAASUVORK5CYII=)
    no-repeat;
  width: 16px;
  height: 16px;
  background-position: 0 0;
  margin-right: 5px;
}

.SchedualQueryCard-container .SchedualQueryCard-tags .SchedualQueryCard-tag {
  margin-bottom: 15px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 400;
  display: flex;
  align-items: center;
}

.PatrolQuery-icon.PatrolQuery-method {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOlSURBVFhH7Vc7iBNBGI4vUHygjVj5qARBfJ2VioUgamNjcZ2llS9EQQvRTgvBRm53E/U2m+QuaZxJ4p0g5LjC4zCCIBYiKj5OOUE4EcHr4vdN/uR2snubg1hY3AfDzvf93+zM/DuPJLWIDhSLjaVuVl92fVVH+WWe4NTFkoiMr3Z7vi64vp5C21k+yamLpSu8oHIQbbXjq68srFOTcCKcen35/Xx1W9x43WCkz/HLZ4RGYSbvq5rj6woGvK9UGlvNJzn1pCTUarVlXlZdNwMO1Ll0vrqX7fkkp854t0Sin2tOVn30At3vBKObWEy9qV0VWyzcbPkk2n/BB3uO5wfXLx+QUCqdr+yH9h1z+eH56qLINvilOVmhFkwSEBcaASfHJKULeqNIFqgzTp9IEfArc6Lp4pMNIrVBrZmE+JXglp6uw/s/PRwa3ULuBOU94O8bjYaJ4wPcc7PqAvofQgIe028CYaBBnV9cqAXqjAu1wOXNL9w5efibvQsYp49+kSzAj6Wu+009Vz4G/tkU1KkxRg/rnTDbJqseCTVAXy9aCSGcQJ1AAnyhUaDBby5boRaoMy7UgtnzWOZC2+hMAEEf/UItMDlc8qxz4mm/cpyDZt3EuSXgYb0T8BxBGRZqgIQ8c/Pl7UK7JwAN3iSuAMSFWuBBx70utI24BJgzAX6hFuCf7pYAeljvBPR/kAAeQElnAOJCLUCfjVs50CMJyCi1hn6hFpCYQRxkl0w9ZgswRg/rnYCv9wSUSq9XwDDGyfKLh28B6oyL1ULSCggXaokrAIOFbzqTq24WqQ1qjIUnFAZivSeAcINyH170EyU8+BnqYolgvjMgDklnAIHYefQ3Hr4u5XoeZ0ykCBDvLQG8LnA93MJLvuG6OesV9A5X61V8klNnvHWthMFTnYfTfFdgC91uAYLvx8BH0deASBzXAPofieu7hZ4TgDv+Nl4wEQQja0WyQJ1x+kSygBf39DuAP1oQ/4PSkHNi0svqG0j+TdZF42qEZ+4HDoF373yQrxxFbNjLVXe1tioSUA178b7T2M53hc6huez1VD5fXS9SLBinL2479PpLELExJPeU0FbCNUv4o9BDr1ADTsq0H8QX99W71jw4YfBJJkUS/DaTU4dMozBgzKBcEZoI+ugXGgGXtzkTmKgF/hdIB5XD8L4S2hX0so1Qbpsl6EejnxmMbavIBrJ9X6JMhhP8XwEDv4MBhg/droVtpHkbxeLESqkuYmFIpf4CU3ORoQqe50QAAAAASUVORK5CYII=)
    no-repeat;
  width: 16px;
  height: 16px;
  background-position: -33px 0;
  margin-right: 5px;
}

.SchedualQueryCard-container .SchedualQueryCard-patrolPointItem {
  border: 1px solid #efefef;
  padding: 20px;
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  margin-bottom: 10px;
}

.SchedualQueryCard-container
  .SchedualQueryCard-patrolPointItem
  .SchedualQueryCard-patrolPointName {
  margin-bottom: 15px;
}

.SchedualQueryCard-container
  .SchedualQueryCard-patrolPointItem
  .SchedualQueryCard-patrolTime {
  font-weight: 400;
}

*,
:after,
:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
