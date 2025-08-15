export function getOrCreateSessionId(agentId: string): string {
  let sessionId = getCookie(`blacksight_chat_session_id_${agentId}`);

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    setCookie(`blacksight_chat_session_id_${agentId}`, sessionId, 365);
  }

  return sessionId;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}
