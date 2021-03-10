import got from "../utils/got";

export const getCsrf = async () => {
    const cookies = got.defaults.options.cookieJar.getCookiesSync('https://api.bilibili.com/')
    for (const cookie of cookies) {
        const found = `${cookie}`.match(/bili_jct=(.{32})/)
        if (found) {
            return found[1]
        }
    }
    throw new Error('guard: csrf 提取失败')
}
