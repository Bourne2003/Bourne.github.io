// allowlist_line_wr_rov_chatgpt_v5.pac
// Allows LINE, Wild Rift, ROV(TH), and ChatGPT (OpenAI). Blocks others.
function dnsDomainIs(host, domain) {
  return (host.length >= domain.length &&
          host.substring(host.length - domain.length) == domain);
}
function inAllowed(host) {
  var ALLOW = [
    // --- PAC host domains (needed to fetch/refresh PAC) ---
    ".github.io",
    ".githubusercontent.com",

    // --- ChatGPT / OpenAI ---
    ".openai.com",
    ".chat.openai.com",
    ".oaistatic.com",
    ".oaiusercontent.com",

    // (optional) Sentry telemetry frequently used by apps; uncomment if needed
    // ".sentry.io",

    // --- LINE ---
    ".line.me",
    ".line-apps.com",
    ".line-scdn.net",
    ".liff.line.me",
    ".profile.line-scdn.net",
    ".obs.line-scdn.net",
    ".line.naver.jp",

    // --- Wild Rift (Riot) ---
    ".riotgames.com",
    ".leagueoflegends.com",
    ".lolstatic.com",
    ".riotcdn.net",
    ".wildrift.leagueoflegends.com",
    ".pvp.net",

    // --- ROV / Arena of Valor (Garena/Tencent, TH) ---
    ".garena.com",
    ".garena.co.th",
    ".garenanow.com",
    ".aov.garena.com",
    ".rov.in.th",
    ".tencentgames.com",
    ".myqcloud.com"
  ];
  for (var i=0;i<ALLOW.length;i++){
    var d = ALLOW[i];
    if (host == d.slice(1) || dnsDomainIs(host, d)) return true;
  }
  return false;
}
function FindProxyForURL(url, host) {
  if (inAllowed(host)) return "DIRECT";
  // Block others by pointing to a blackhole proxy
  return "PROXY 127.0.0.1:9";
}
