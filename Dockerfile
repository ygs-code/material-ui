FROM node:14-alpine AS BUILD_IMAGE
#声明作者
MAINTAINER yao guan shou

RUN mkdir ot-system-client
# 复制package.json文件
COPY  package.json  /ot-system-client
WORKDIR /ot-system-client
# RUN echo 'dist , node_modules目录下所有文件,以及清理缓存'
RUN echo '删除dist,node_modules目录下所有文件,以及清理缓存' & rm -rf ./node_modules & rm -rf  ./dist & rm -rf package-lock.json & rm -rf yarn.lock & npm cache clean --force
RUN echo '安装node_modules依赖包' & npm install --production 

ARG CLIENT_ADDRESS 
ARG CLIENT_PORT 
ARG CLIENT_PUBLICPATH 
ARG CLIENT_NODE_ENV 
ARG CLIENT_RENDER 

ARG ENTRY_SERVER_NAME

ENV ADDRESS=${CLIENT_ADDRESS}
ENV PORT=${CLIENT_PORT}
ENV PUBLICPATH=${CLIENT_PUBLICPATH}
ENV NODE_ENV=${CLIENT_NODE_ENV}
ENV RENDER=${CLIENT_RENDER}

ENV ENTRY_SERVER_NAME=${ENTRY_SERVER_NAME}

#清理缓存
ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
#移动当前目录下面的文件到client目录下
COPY  .  /ot-system-client
# RUN echo '复制成功'
#进入到ot-system-client目录下面，类似cd
WORKDIR /ot-system-client

# RUN echo 'webpack打包编译生产代码'
RUN echo '编译打包client' & npm run build:client:prod

# # # 设置基础镜像
FROM nginx:alpine

# 定义作者
MAINTAINER yao guan shou
#对外暴露的端口
# EXPOSE 3002
#更新Alpine的软件源为国内（清华大学）的站点，因为从默认官源拉取实在太慢了。。。
RUN echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.4/main/" > /etc/apk/repositories
RUN apk update \
    && apk upgrade \
    && apk add --no-cache bash \
    bash-doc \
    bash-completion \
    && rm -rf /var/ca

# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
RUN echo '复制静态文件到nginx html目录中'
# 拷贝 装依赖阶段 生成的 node_modules 文件夹到工作目录下
COPY --from=BUILD_IMAGE  /ot-system-client/dist/client  /usr/share/nginx/html/
# COPY  dist/client  /usr/share/nginx/html/

# 覆盖默认配置
COPY nginx/nginx.conf   /etc/nginx/conf.d/default.conf
RUN echo 'client镜像build打包成功'

CMD ["nginx", "-g", "daemon off;"]

# docker run -it --env-file ./run/hrms.env -v

