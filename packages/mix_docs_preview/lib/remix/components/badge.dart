/// RemixBadge Example
///
/// Fortal badge variants — solid, soft, surface, and outline.

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
    return FortalScope(
      accent: .green,
      brightness: .dark,
      child: const BadgePreview(),
    );
  }
}

class BadgePreview extends StatelessWidget {
  const BadgePreview({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: .center,
      mainAxisSize: .min,
      spacing: 16,
      children: [
        const FortalBadge.solid(label: 'Solid'),
        const FortalBadge.soft(label: 'Soft'),
        const FortalBadge.surface(label: 'Surface'),
        const FortalBadge.outline(label: 'Outline'),
      ],
    );
  }
}
