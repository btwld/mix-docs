/// RemixButton Example
///
/// Fortal button variants — solid, soft, surface, outline, and ghost.

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
    return FortalScope(brightness: .dark, child: const ButtonPreview());
  }
}

class ButtonPreview extends StatelessWidget {
  const ButtonPreview({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: .center,
      mainAxisSize: .min,
      spacing: 12,
      children: [
        RemixButton(
          onPressed: () {},
          label: 'Solid',
          style: FortalButtonStyle.solid(),
        ),
        RemixButton(
          onPressed: () {},
          label: 'Soft',
          style: FortalButtonStyle.soft(),
        ),
        RemixButton(
          onPressed: () {},
          label: 'Surface',
          style: FortalButtonStyle.surface(),
        ),
        RemixButton(
          onPressed: () {},
          label: 'Outline',
          style: FortalButtonStyle.outline(),
        ),
        RemixButton(
          onPressed: () {},
          label: 'Ghost',
          style: FortalButtonStyle.ghost(),
        ),
      ],
    );
  }
}
