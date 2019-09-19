var FindProxyForURL = function(init, profiles) {
    return function(url, host) {
        "use strict";
        var result = init, scheme = url.substr(0, url.indexOf(":"));
        do {
            result = profiles[result];
            if (typeof result === "function") result = result(url, host, scheme);
        } while (typeof result !== "string" || result.charCodeAt(0) === 43);
        return result;
    };
}("+AUTO", {
    "+AUTO": function(url, host, scheme) {
        "use strict";
        if (/(?:^|\.)googlevideo\.com$/.test(host)) return "+SSR";
        if (/(?:^|\.)ggpht\.com$/.test(host)) return "+SSR";
        if (/(?:^|\.)ytimg\.com$/.test(host)) return "+SSR";
        if (/(?:^|\.)awsstatic\.com$/.test(host)) return "DIRECT";
        if (/(?:^|\.)mktoresp\.com$/.test(host)) return "DIRECT";
        if (/(?:^|\.)youtube\.com$/.test(host)) return "+SSR";
        if (/(?:^|\.)google\.com$/.test(host)) return "+SSR";
        if (/(?:^|\.)gstatic\.com$/.test(host)) return "+SSR";
        if (/(?:^|\.)googleapis\.com$/.test(host)) return "+SSR";
        if (/(?:^|\.)googleusercontent\.com$/.test(host)) return "+SSR";
        if (/(?:^|\.)wikipedia\.org$/.test(host)) return "+SSR";
        if (/(?:^|\.)wikimedia\.org$/.test(host)) return "+SSR";
        return "DIRECT";
    },
    "+SSR": function(url, host, scheme) {
        "use strict";
        if (/^127\.0\.0\.1$/.test(host) || /^::1$/.test(host) || /^localhost$/.test(host)) return "DIRECT";
        return "SOCKS5 127.0.0.1:1080; SOCKS 127.0.0.1:1080";
    }
});
