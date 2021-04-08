FROM node:14

# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方が確実にコピーされるようにします。
# 可能であれば (npm@5+)

ARG WORKSPACE
ENV NODE_ROOT /${WORKSPACE}
RUN echo $WORKSPACE
WORKDIR $NODE_ROOT
#ADD ./package.json $NODE_ROOT
#ADD ./yarn.lock $NODE_ROOT

#ADD package.json $NODE_ROOT/package.json
#ADD package-lock.json $NODE_ROOT/package-lock.json
#ADD . .
#RUN npm install
# 本番用にコードを作成している場合

#RUN node ./window.js
