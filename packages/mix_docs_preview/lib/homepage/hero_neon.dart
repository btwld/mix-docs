/// Landing hero — Neon Remix button style (cyberpunk glow).
library;

import 'package:flutter/material.dart';
import 'package:mix_docs_preview/helpers.dart';
import 'package:remix/remix.dart';

void main() {
  runMixApp(const Example());
}

class Example extends StatelessWidget {
  const Example({super.key});

  @override
  Widget build(BuildContext context) {
    return FortalScope(brightness: .dark, child: const _HeroButton());
  }
}

class _HeroButton extends StatelessWidget {
  const _HeroButton();

  @override
  Widget build(BuildContext context) {
    // #docregion style
    final style = RemixButtonStyle()
        .color(const Color(0xFF0A0014))
        .labelColor(const Color(0xFF00F0FF))
        .paddingX(24)
        .paddingY(11)
        .borderRadiusAll(const Radius.circular(2))
        .borderAll(color: const Color(0xFF00F0FF), width: 1)
        .shadowOnly(color: const Color(0xFFFF00E5), blurRadius: 22);
    // #enddocregion style

    return RemixButton(label: 'GET STARTED', onPressed: () {}, style: style);
  }
}
