<template>
    <div id="header">
        <h1>SPECTROM</h1>
        <hr/>
        <div id="nav">
            <router-link to="/">HOME</router-link>
            <router-link to="/cart">CART</router-link>
        </div>
    </div>
</template>

<style lang="less" scoped>
#header {
    background-color: #f7fcfb;
    margin-bottom: 40px;

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            font-size: 15px;
            color: #2c2b2a;
            margin: 0 10px;
            text-decoration-line: none;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
}
</style>
