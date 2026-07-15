/// Landing hero — Classic Remix button style (solid accent fill).
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
    final style = RemixButtonStyler()
        .color(const Color(0xFF00EB03))
        .label(.color(const Color(0xFF05040A)))
        .padding(.horizontal(22).vertical(11))
        .borderRadius(.circular(10))
        .onHovered(.new().color(const Color(0xFF33FF36)))
        .onPressed(.new().scale(0.97))
        .animate(.spring(180.ms));
    // #enddocregion style

    return RemixButton(label: 'Get started', onPressed: () {}, style: style);
  }
}
