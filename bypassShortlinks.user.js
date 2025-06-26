// ==UserScript==
// @name         Universal Short-Link Auto-Bypasser
// @namespace    https://github.com/example/universal-shortlink-bypass/
// @version      0.1.0
// @description  Attempts to automatically bypass / resolve (most) short-link services and land on the final destination without user interaction.
// @author       You
// @match        *://*/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @connect      *
// ==/UserScript==

(function() {
    "use strict";

    accelerateTimers();

    function accelerateTimers() {
        const CAP = 800;
        const _setTimeout = window.setTimeout;
        window.setTimeout = function(fn, delay, ...rest) {
            return _setTimeout(fn, Math.min(delay, CAP), ...rest);
        };
        const _setInterval = window.setInterval;
        window.setInterval = function(fn, delay, ...rest) {
            return _setInterval(fn, Math.min(delay, CAP), ...rest);
        };
    }

    const CONFIG = {
        maxRedirects: 8,
        timeout: 10000,
        openInNewTab: false,
        knownHosts: {
            "adf.ly": adflyResolver,
            "ouo.io": genericWaitAndRedirect,
            "linkvertise.com": linkvertiseResolver,
            "9.bb": adflyResolver,
            "u.bb": adflyResolver,
            "j.gs": adflyResolver,
            "q.gs": adflyResolver,
            "bc.vc": genericWaitAndRedirect,
            "adfoc.us": genericWaitAndRedirect,
            "shorte.st": genericWaitAndRedirect,
            "sh.st": genericWaitAndRedirect,
            "ouo.press": genericWaitAndRedirect,
            "ouo.se": genericWaitAndRedirect,
            "link.tl": genericWaitAndRedirect,
            "tmearn.com": genericWaitAndRedirect,
            "tmearn.net": genericWaitAndRedirect,
            "exe.io": genericWaitAndRedirect,
            "exey.io": genericWaitAndRedirect,
            "clk.sh": genericWaitAndRedirect,
            "fc.lc": genericWaitAndRedirect,
            "fc-lc.com": genericWaitAndRedirect,
            "cuturl.in": genericWaitAndRedirect,
            "shrinkearn.com": genericWaitAndRedirect,
            "shrinkme.io": genericWaitAndRedirect,
            "droplink.co": genericWaitAndRedirect,
            "linkvertise.net": linkvertiseResolver,
            "megaurl.in": genericWaitAndRedirect,
            "gmailurl.in": genericWaitAndRedirect,
            "short2url.co": genericWaitAndRedirect,
            "adshnk.com": genericWaitAndRedirect,
            "adshnk.net": genericWaitAndRedirect,
            "keptshort.in": genericWaitAndRedirect,
            "linkrex.net": genericWaitAndRedirect,
            "clk.ink": genericWaitAndRedirect,
            "wavea.shop": genericWaitAndRedirect,
            "gplinks.in": genericWaitAndRedirect,
            "rocklinks.net": genericWaitAndRedirect,
            "rocklink.in": genericWaitAndRedirect,
            "rocklink.us": genericWaitAndRedirect,
            "linkhub.top": genericWaitAndRedirect,
            "linkhub.to": genericWaitAndRedirect,
            "linktricks.site": genericWaitAndRedirect,
            "mdiskshortener.link": genericWaitAndRedirect,
            "pdiskshortener.com": genericWaitAndRedirect,
            "moviesmodlinks.com": genericWaitAndRedirect,
            "shortmylinks.com": genericWaitAndRedirect,
            "linkbyme.com": genericWaitAndRedirect,
            "mboost.me": genericWaitAndRedirect,
            "hondalink.info": genericWaitAndRedirect,
            "shortxy.cc": genericWaitAndRedirect,
            "earnlearn.live": genericWaitAndRedirect,
            "ytsurl.com": genericWaitAndRedirect,
            "urlgd.me": genericWaitAndRedirect,
            "hdlink.pro": genericWaitAndRedirect,
            "try2link.com": genericWaitAndRedirect,
            "link-center.net": genericWaitAndRedirect,
            "linkboxy.com": genericWaitAndRedirect,
            "rockfm.xyz": genericWaitAndRedirect,
            "kuttyurls.com": adflyResolver,
            "shorturl.katmoviehd.fun": adflyResolver,
            "srtsfly.com": adflyResolver,
            "flylinks.me": adflyResolver,
            "indishort.in": genericWaitAndRedirect,
            "safelinks.quest": genericWaitAndRedirect,
            "technicalatg.com": genericWaitAndRedirect,
            "techno.rip": genericWaitAndRedirect,
            "festyy.com": genericWaitAndRedirect,
            "destyy.com": genericWaitAndRedirect,
            "gplinks.co": genericWaitAndRedirect,
            "rocklinks.co": genericWaitAndRedirect,
            "rocklinks.top": genericWaitAndRedirect,
            "mdiskshort.link": genericWaitAndRedirect,
            "mdiskshort.com": genericWaitAndRedirect,
            "linkbnao.com": genericWaitAndRedirect,
            "linksilo.in": genericWaitAndRedirect,
            "linksilo.to": genericWaitAndRedirect,
            "linksilo.info": genericWaitAndRedirect,
            "mylinkzone.com": genericWaitAndRedirect,
            "boosts.lol": genericWaitAndRedirect,
            "boost.link": genericWaitAndRedirect,
            "hinterlinks.xyz": genericWaitAndRedirect,
            "shareus.io": genericWaitAndRedirect,
            "shrinkme.pro": genericWaitAndRedirect,
            "earnmoneyadvertising.com": genericWaitAndRedirect,
            "clk.ink": genericWaitAndRedirect,
            "wavea.shop": genericWaitAndRedirect,
            "gplinks.in": genericWaitAndRedirect,
            "rocklinks.net": genericWaitAndRedirect,
            "rocklink.in": genericWaitAndRedirect,
            "rocklink.us": genericWaitAndRedirect,
            "linkhub.top": genericWaitAndRedirect,
            "linkhub.to": genericWaitAndRedirect,
            "linktricks.site": genericWaitAndRedirect,
            "mdiskshortener.link": genericWaitAndRedirect,
            "pdiskshortener.com": genericWaitAndRedirect,
            "moviesmodlinks.com": genericWaitAndRedirect,
            "shortmylinks.com": genericWaitAndRedirect,
            "linkbyme.com": genericWaitAndRedirect,
            "mboost.me": genericWaitAndRedirect,
            "hondalink.info": genericWaitAndRedirect,
            "shortxy.cc": genericWaitAndRedirect,
            "earnlearn.live": genericWaitAndRedirect,
            "ytsurl.com": genericWaitAndRedirect,
            "urlgd.me": genericWaitAndRedirect,
            "hdlink.pro": genericWaitAndRedirect,
            "try2link.com": genericWaitAndRedirect,
            "link-center.net": genericWaitAndRedirect,
            "linkboxy.com": genericWaitAndRedirect,
            "rockfm.xyz": genericWaitAndRedirect,
            "kuttyurls.com": adflyResolver,
            "shorturl.katmoviehd.fun": adflyResolver,
            "srtsfly.com": adflyResolver,
            "flylinks.me": adflyResolver,
            "indishort.in": genericWaitAndRedirect,
            "safelinks.quest": genericWaitAndRedirect,
            "technicalatg.com": genericWaitAndRedirect,
            "techno.rip": genericWaitAndRedirect,
            "festyy.com": genericWaitAndRedirect,
            "destyy.com": genericWaitAndRedirect
        }
    };

    const HOST_RESOLVERS = new Map(Object.entries(CONFIG.knownHosts));

    function getHostResolver(hostname) {
        hostname = hostname.toLowerCase();
        if (HOST_RESOLVERS.has(hostname)) return HOST_RESOLVERS.get(hostname);
        const parts = hostname.split('.');
        while (parts.length > 2) {
            parts.shift();
            const candidate = parts.join('.');
            if (HOST_RESOLVERS.has(candidate)) return HOST_RESOLVERS.get(candidate);
        }
        return null;
    }

    const CACHE_MAX_AGE = 24 * 60 * 60 * 1000;

    const CACHE_KEY = "uslb-cache-v2";
    const rawCache = GM_getValue(CACHE_KEY, "[]");
    const cache = new Map(JSON.parse(rawCache));

    function cacheGet(url) {
        const entry = cache.get(url);
        if (!entry) return null;
        if (typeof entry === "string") return entry;
        if (Date.now() - entry.ts < CACHE_MAX_AGE) return entry.target;
        cache.delete(url);
        return null;
    }

    function cachePut(key, value) {
        cache.set(key, { target: value, ts: Date.now() });
        while (cache.size > 500) cache.delete(cache.keys().next().value);
        GM_setValue(CACHE_KEY, JSON.stringify(Array.from(cache.entries())));
    }

    async function cachedResolve(url, depth) {
        const cached = cacheGet(url);
        if (cached) return cached;
        const final = await resolveURL(url, depth);
        cachePut(url, final);
        return final;
    }

    function isShortLinkHost(hostname) {
        if (getHostResolver(hostname)) return true;
        const parts = hostname.split('.');
        if (parts.length === 2 && parts[1].length <= 3) return true;
        const tld = parts[parts.length - 1].toLowerCase();
        const commonTLDs = ["ly","gl","co","io","gg","gd","ac","me","sh","cl"];
        return commonTLDs.includes(tld);
    }

    (async function main() {
        const hostname = window.location.hostname.replace(/^www\./, "");
        if (!isShortLinkHost(hostname)) return;

        autoClickSkipButtons();

        const quick = quickExtractDirect(window.location.href);
        if (quick) {
            redirectTo(quick);
            return;
        }

        try {
            let finalUrl = null;
            const resolver = getHostResolver(hostname);
            if (resolver) {
                finalUrl = await resolver(window.location.href);
            }
            if (!finalUrl || finalUrl === window.location.href) {
                finalUrl = await cachedResolve(window.location.href, 0);
            }
            if (finalUrl && finalUrl !== window.location.href) redirectTo(finalUrl);
        } catch (e) {
            console.warn("[Bypass] Failed to resolve final URL", e);
        }
    })();

    function autoClickSkipButtons() {
        const KEYWORDS = [
            "skip",
            "continue",
            "click to continue",
            "click here to continue",
            "get link",
            "getlink",
            "go to link",
            "go to download",
            "download link",
            "access",
            "unlock",
            "proceed",
            "next",
        ];

        const candidates = [
            '#skip_button', '#skip_button2', '#btn-main', '#btn-main2', '#link-btn',
            '#continue', '#go', '#proceed', '#next', '#download', '#direct-link',
            '.btn-main', '.get-link', '.btn', '.main-btn', '.skip-ad', '.continue-btn',
            '.btn-continue', '.direct-link', '.download-btn', '.access-link'
        ];
        const deadline = Date.now() + 12000;

        const scanOnce = () => {
            if (Date.now() > deadline || !/^(http|https):\/\//.test(window.location.href)) {
                clearInterval(timer);
                observer.disconnect();
                return;
            }

            for (const sel of candidates) {
                const el = document.querySelector(sel);
                if (maybeClick(el)) return;
            }

            const docs = [document];
            for (const fr of document.querySelectorAll('iframe')) {
                try {
                    if (fr.contentDocument) docs.push(fr.contentDocument);
                } catch {}
            }

            for (const doc of docs) {
                for (const sel of candidates) {
                    const el = doc.querySelector(sel);
                    if (maybeClick(el)) return;
                }
                const elements = [...doc.querySelectorAll('a, button, input[type="button"], input[type="submit"]')];
                for (const el of elements) {
                    const txt = (el.textContent || el.value || "").trim().toLowerCase();
                    if (KEYWORDS.some(k => txt.includes(k)) && maybeClick(el)) return;
                }
            }
        };

        const timer = setInterval(scanOnce, 150);

        const observer = new MutationObserver(scanOnce);
        observer.observe(document.documentElement, { childList: true, subtree: true });

        function maybeClick(el) {
            if (!el) return false;
            const rect = el.getBoundingClientRect();
            if (rect.width < 1 || rect.height < 1) return false;
            console.log('[Bypass] Auto-clicking skip/get button');
            el.click();
            clearInterval(timer);
            return true;
        }
    }

    function resolveURL(url, depth) {
        if (depth >= CONFIG.maxRedirects) return Promise.reject(new Error("Redirect limit reached"));
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "HEAD",
                url,
                timeout: CONFIG.timeout,
                anonymous: true,
                followRedirects: false,
                onload: async function(resp) {
                    if (resp.status >= 300 && resp.status < 400 && resp.responseHeaders) {
                        const loc = /location:\s*(.*)/i.exec(resp.responseHeaders);
                        if (loc && loc[1]) {
                            const next = new URL(loc[1].trim(), url).href;
                            resolve(await resolveURL(next, depth + 1));
                            return;
                        }
                    }
                    resolve(await scanHTML(url, depth));
                },
                ontimeout: () => reject(new Error("Request timeout")),
                onerror: () => reject(new Error("Network error"))
            });
        });
    }

    function scanHTML(url, depth) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url,
                timeout: CONFIG.timeout,
                anonymous: true,
                onload: async function(resp) {
                    if (resp.status >= 300 && resp.status < 400) {
                        const loc = resp.responseHeaders.match(/location:\s*(.*)/i);
                        if (loc && loc[1]) {
                            const next = new URL(loc[1].trim(), url).href;
                            resolve(await resolveURL(next, depth + 1));
                            return;
                        }
                    }
                    const html = resp.responseText;
                    const meta = html.match(/<meta[^>]+http-equiv=["']?refresh["']?[^>]+content=["']?\d+;\s*url=([^"'>]+)["']/i);
                    if (meta && meta[1]) {
                        const next = new URL(meta[1].trim(), url).href;
                        resolve(await resolveURL(next, depth + 1));
                        return;
                    }
                    const meta2 = html.match(/<meta[^>]+content=["']?\d+;\s*url=([^"'>]+)["'][^>]*>/i);
                    if (meta2 && meta2[1]) {
                        const next = new URL(meta2[1].trim(), url).href;
                        resolve(await resolveURL(next, depth + 1));
                        return;
                    }
                    const js = html.match(/window\.location(?:\.href)?\s*=\s*["']([^"']+)["']/i);
                    if (js && js[1]) {
                        const next = new URL(js[1].trim(), url).href;
                        resolve(await resolveURL(next, depth + 1));
                        return;
                    }
                    const metaUrlPatterns = [
                        /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i,
                        /<meta[^>]+property=["']twitter:url["'][^>]+content=["']([^"']+)["']/i,
                        /<meta[^>]+property=["']og:redirect["'][^>]+content=["']([^"']+)["']/i,
                        /<meta[^>]+name=["']redirect["'][^>]+content=["']([^"']+)["']/i,
                        /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
                    ];
                    for (const re of metaUrlPatterns) {
                        const m = re.exec(html);
                        if (m && m[1]) {
                            const next = new URL(m[1].trim(), url).href;
                            if (next && next !== url) {
                                resolve(await resolveURL(next, depth + 1));
                                return;
                            }
                        }
                    }
                    const b64 = html.match(/atob\(["']([A-Za-z0-9+/=]{20,})["']\)/i);
                    if (b64 && b64[1]) {
                        try {
                            const decoded = atob(b64[1]);
                            if (/^https?:\/\//i.test(decoded)) {
                                resolve(await resolveURL(decoded, depth + 1));
                                return;
                            }
                        } catch {}
                    }
                    const guess = guessExternalUrl(html, url);
                    if (guess) {
                        resolve(await resolveURL(guess, depth + 1));
                        return;
                    }
                    resolve(url);
                },
                ontimeout: () => reject(new Error("Request timeout")),
                onerror: () => reject(new Error("Network error"))
            });
        });
    }

    function guessExternalUrl(html, base) {
        const patterns = [
            /href=["'](https?:\/\/[^"']+)["']/gi,
            /src=["'](https?:\/\/[^"']+)["']/gi,
            /window\.open\(["'](https?:\/\/[^"']+)["']/gi
        ];
        const currentHost = new URL(base).hostname.replace(/^www\./, "");
        for (const re of patterns) {
            let m;
            while ((m = re.exec(html)) !== null) {
                const candidate = m[1];
                try {
                    const h = new URL(candidate, base).hostname.replace(/^www\./, "");
                    if (h !== currentHost) return candidate;
                } catch {}
            }
        }
        return null;
    }

    function quickExtractDirect(href) {
        try {
            const u = new URL(href);
            const keys = ["r", "url", "dest", "destination", "target", "u", "to", "redirect"];
            for (const k of keys) {
                const val = u.searchParams.get(k);
                if (!val) continue;
                let decoded = decodeURIComponent(val.replace(/\s+/g, ""));
                if (!/^https?:/i.test(decoded)) {
                    try {
                        decoded = atob(decoded);
                    } catch {}
                }
                if (/^https?:\/\//i.test(decoded)) return decoded;
            }
        } catch {}
        return null;
    }

    function redirectTo(dest) {
        console.log(`[Bypass] Redirecting to final URL: ${dest}`);
        if (CONFIG.openInNewTab) {
            GM_openInTab(dest, { active: true });
        } else {
            window.location.replace(dest);
        }
    }

    async function adflyResolver(currentUrl) {
        try {
            const direct = await resolveURL(currentUrl, 0);
            if (direct && direct !== currentUrl) return direct;
        } catch {}

        try {
            const html = await (await fetch(currentUrl, { credentials: "omit" })).text();
            const ys = /ysmm\s*=\s*['"]([^'"]+)['"]/i.exec(html);
            if (ys && ys[1]) {
                const decoded = decodeYsmm(ys[1]);
                if (decoded) return decoded;
            }
        } catch (e) { }

        return currentUrl;
    }

    function decodeYsmm(ysmm) {
        let a = "", b = "";
        for (let i = 0; i < ysmm.length; i++) {
            if (i % 2 === 0) {
                a += ysmm.charAt(i);
            } else {
                b = ysmm.charAt(i) + b;
            }
        }
        const key = a + b;
        const result = atob(key).replace(/^[^\?]+\?/, "");
        const url = result.match(/https?:\/\/[^']+/);
        return url ? url[0] : null;
    }

    async function linkvertiseResolver(currentUrl) {
        try {
            const idMatch = currentUrl.match(/\/((?:\d+))$/);
            if (!idMatch) return currentUrl;
            const id = idMatch[1];
            const apiURL = `https://api.linkvertise.com/api/v1/redirect/link/static/${id}`;
            const res = await fetch(apiURL);
            const data = await res.json();
            if (data && data.data && data.data.target) return data.data.target;
        } catch (e) { console.warn("[Bypass] Linkvertise custom resolver failed", e); }
        return currentUrl;
    }

    async function genericWaitAndRedirect(currentUrl) {
        await new Promise(r => setTimeout(r, 500));
        return await cachedResolve(currentUrl, 0);
    }
})(); 