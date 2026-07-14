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
    return FortalScope(accent: .green, brightness: .dark, child: const BadgePreview());
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
        RemixBadge(label: 'Solid', style: fortalBadgeStyler(variant: .solid)),
        RemixBadge(label: 'Soft', style: fortalBadgeStyler(variant: .soft)),
        RemixBadge(label: 'Surface', style: fortalBadgeStyler(variant: .surface)),
        RemixBadge(label: 'Outline', style: fortalBadgeStyler(variant: .outline)),
      ],
    );
  }
}
