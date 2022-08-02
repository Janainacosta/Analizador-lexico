const tokenRegex = [
  [/([@][A-Za-z1-9_])\w+/g, "nomeVariavel", "@letra*|letra*digito*"],
  [
    /["][a-zA-Z0-9 $&+,:;=?@#|<>.^*()%!-ç]*["]/g,
    "literal",
    "“letra*|letra*digito*”",
  ],
  [/([1-9])\w+/g, "digito", "1-9"],
  [/([a-zA-Z])\w+/g, "letra", "a-z"],
  [/[+\-*/%]/g, "operadorAritmetico", "+, -, *, /, %"],
];
