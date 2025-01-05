// for more information on nginx proxy manager check <nginxpm-host>/api/schema

export function createProxyHost() {
        // TODO: create proxy 
        fetch(`${NGINX_HOST}/api/nginx/proxy-hosts`, {
                method: 'POST'
        })
}
