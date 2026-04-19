/// RemixIconButton Example
///
/// Fortal icon button variants — solid, soft, surface, outline, and ghost.

library;

import 'package:flutter/cupertino.dart';
import 'package:mix_docs_preview/helpers.dart';
import 'package:remix/remix.dart';

void main() {
  runMixApp(const Example());
}

class Example extends StatelessWidget {
  const Example({super.key});

  @override
  Widget build(BuildContext context) {
    return FortalScope(brightness: .dark, child: const IconButtonPreview());
  }
}

class IconButtonPreview extends StatelessWidget {
  const IconButtonPreview({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: .center,
      mainAxisSize: .min,
      spacing: 16,
      children: [
        RemixIconButton(
          icon: CupertinoIcons.heart,
          onPressed: () {},
          style: FortalIconButtonStyle.solid(),
        ),
        RemixIconButton(
          icon: CupertinoIcons.heart,
          onPressed: () {},
          style: FortalIconButtonStyle.soft(),
        ),
        RemixIconButton(
          icon: CupertinoIcons.heart,
          onPressed: () {},
          style: FortalIconButtonStyle.surface(),
        ),
        RemixIconButton(
          icon: CupertinoIcons.heart,
          onPressed: () {},
          style: FortalIconButtonStyle.outline(),
        ),
        RemixIconButton(
          icon: CupertinoIcons.heart,
          onPressed: () {},
          style: FortalIconButtonStyle.ghost(),
        ),
      ],
    );
  }
}
