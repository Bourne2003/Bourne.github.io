// allowlist_line_wr_rov.pac
// Only LINE, Wild Rift, and ROV (Thailand) domains are allowed. Everything else is blocked.
function dnsDomainIs(host, domain) {
  return (host.length >= domain.length &&
          host.substring(host.length - domain.length) == domain);
}

function inAllowed(host) {
  // ===== LINE =====
  var ALLOW = [
    ".line.me",
    ".line-apps.com",
    ".line-scdn.net",
    ".liff.line.me",
    ".profile.line-scdn.net",
    ".obs.line-scdn.net",
    // legacy JP endpoint
    ".line.naver.jp",

    // ===== Wild Rift (Riot) =====
    ".riotgames.com",
    ".leagueoflegends.com",
    ".lolstatic.com",
    ".riotcdn.net",
    ".wildrift.leagueoflegends.com",
    ".pvp.net",

    // ===== ROV / Arena of Valor (Garena/Tencent, TH) =====
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

// Main
function FindProxyForURL(url, host) {
  if (inAllowed(host)) {
    return "DIRECT";
  }
  // Block others by sending to a blackhole proxy
  return "PROXY 127.0.0.1:9";
}
