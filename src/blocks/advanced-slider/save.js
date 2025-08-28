/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save( { attributes } ) {
	const { showArrows = true, slideCount = 0 } = attributes || {};
	const showNav = showArrows && slideCount > 5;
	return (
		<div { ...useBlockProps.save( { className: 'slider-wrapper' } ) }>
			{ showNav && (
				<div className="slider-nav" aria-hidden="true">
					<span className="prev">‹</span>
					<span className="next">›</span>
				</div>
			) }
			<div className="slider-grid">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
