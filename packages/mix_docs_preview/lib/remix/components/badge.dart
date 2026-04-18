/// RemixBadge Example
///
/// Fortal badge variants — solid, soft, surface, and outline.

library;

import 'package:flutter/material.dart';
import 'package:mix_docs_preview/helpers.dart';
import 'package:remix/remix.dart';

void main() {
  runMixApp(FortalScope(child: const Example()));
}

class Example extends StatelessWidget {
  const Example({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: .center,
      mainAxisSize: .min,
      spacing: 16,
      children: [
        RemixBadge(label: 'Solid', style: FortalBadgeStyles.solid()),
        RemixBadge(label: 'Soft', style: FortalBadgeStyles.soft()),
        RemixBadge(label: 'Surface', style: FortalBadgeStyles.surface()),
        RemixBadge(label: 'Outline', style: FortalBadgeStyles.outline()),
      ],
    );
  }
}
