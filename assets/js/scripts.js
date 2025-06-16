document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("terminal-input");
  const output = document.getElementById("terminal-output");

  const commands = {
    help: `Available commands:
- help tracing
- help osint
- help stress-test
- help webdev
- help misc`,
    "help tracing": `Phone #, IP and GeoIP Tracing:
Offering services to help figure out whose been getting into your shit or figuring out who has been calling you randomly.`,
    "help osint": `OSINT Work:
Being harassed? Wanna know more about someone? Being blackmailed? Then this is the right option for you :p`,
    "help stress-test": `DoS/DDoS Stresstesting:
Wanna test the security of your website or a server that you run? Then try this out.`,
    "help webdev": `Web Development:
Don't wanna go through the hassle of making your own website? Let us do it for you!`,
    "help misc": `Misc Option:
For more services, contact KetaGod on Telegram and ask about "our other services".`
  };

  const commandHistory = [];
  let historyIndex = -1;

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const cmd = input.value.trim().toLowerCase();
      if (cmd) commandHistory.push(cmd);
      historyIndex = commandHistory.length;

      const response = commands[cmd] || `Unknown command: '${cmd}'`;

      output.textContent += `\n> ${cmd}\n${response}\n> `;
      input.value = "";
      output.scrollTop = output.scrollHeight;
    } else if (e.key === "ArrowUp") {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        input.value = "";
        historyIndex = commandHistory.length;
      }
      e.preventDefault();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = input.value.trim().toLowerCase();
      const matches = Object.keys(commands).filter(cmd => cmd.startsWith(current));
      if (matches.length === 1) {
        input.value = matches[0];
      } else if (matches.length > 1) {
        output.textContent += `\n> ${current}\n${matches.join("\n")}\n> `;
        output.scrollTop = output.scrollHeight;
      }
    }
  });
});
